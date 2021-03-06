import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { MemberUpdate } from 'src/app/models/memberUpdate';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import "automapper-ts/dist/automapper";
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: MemberUpdate;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification ($event: any) {
    if(this.editForm.dirty)
      $event.returnValue = true;
  }

  constructor(
    private accountService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    this.membersService
      .getMember(this.user.userName)
      .subscribe((member) => (this.member = member));
  }

  saveChanges(): void {
    this.membersService.updateMember(this.member).subscribe(()=> {
      //In case of success
      this.toastr.success("Profile Updated Successfully");
      this.editForm.reset(this.member);
    })
  }
}
