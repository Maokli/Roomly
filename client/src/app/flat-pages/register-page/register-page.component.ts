import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  maxDate: Date;

  constructor(private accountService: AccountService, private toastr: ToastrService,
     private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }

  InitializeForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['male'],
      doesDrink: [false],
      doesSmoke: [false],
      hasPets: [false],
      hasLivedWithSomeoneBefore: [false],
      hasAllergies: [false],
      isMovingAlone: [false],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      budget: [0, Validators.required],
      username: ['', Validators.required],
      password: ['', 
        [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', 
        [Validators.required, this.matchValues('password')]],
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register(){
    const value = { ...this.registerForm.value, budget: +this.registerForm.value.budget };
    this.accountService.register(value).subscribe(response => {
      this.router.navigateByUrl('/find-roommates');

    }, error => {
      console.log(error);
      this.toastr.error(error.error)
    })
  }

}
