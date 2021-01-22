import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService) {}
  ngOnInit() {
    this.setCurrentUser();
    this.animateNav();
  }
  
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  animateNav(){
    document.addEventListener('scroll',()=>{
      console.log(window.scrollY);
      if(window.scrollY !== 0){
        const nav = document.querySelector('nav');
        nav.style.filter = 'drop-shadow(0 0 10px #000)';
      }
      else{
        const nav = document.querySelector('nav');
        nav.style.filter = '';
      }
    });
  }

}
