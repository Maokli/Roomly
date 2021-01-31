import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  model:any = {};
  constructor(
    private accountService: AccountService,
    private router:Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.cleanInputForm();
  }


  login(){
    this.accountService.login(this.model).subscribe(response =>{
      this.router.navigateByUrl('/');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
      this.showValidationErrors(error.error);
    })
  }

  showValidationErrors(error: string){
    const usenameFormGroup = document.querySelector('.username');
    const passwordFormGroup = document.querySelector('.password');
    const err = error.toLowerCase();
    if(err.includes('username'))
      usenameFormGroup.querySelector('p').style.visibility = 'visible';
    if(err.includes('password'))
      passwordFormGroup.querySelector('p').style.visibility = 'visible';
  }

  cleanInputForm(){
    const usenameFormGroup = document.querySelector('.username');
    const passwordFormGroup = document.querySelector('.password');
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        usenameFormGroup.querySelector('p').style.visibility = 'hidden';
        passwordFormGroup.querySelector('p').style.visibility = 'hidden';
      })
    })
  }
}
