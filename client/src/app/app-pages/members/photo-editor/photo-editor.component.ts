import { Component, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { BusyService } from 'src/app/services/busy.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.ApiUrl;
  user: User;

  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private busyService: BusyService) {
    accountService.currentUser$.pipe(take(1))
      .subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader ({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: 10*1024*1024
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onProgressItem = () => {
      this.busyService.busy();
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        this.busyService.idle();
        const photo = JSON.parse(response);
        this.user.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user);
        this.toastr.success("Photo uploaded successfully");
      }
    }
  }
}
