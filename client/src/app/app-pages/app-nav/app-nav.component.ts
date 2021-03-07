import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppNavComponent implements OnInit {

  constructor(public accountService: AccountService, private router:Router) { }

  ngOnInit(): void {
    this.positionNav();
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  positionNav() {
    if(window.screen.width > 768)
      return;
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.remove();
    document.querySelector('body').appendChild(mobileNav);
  }
}
