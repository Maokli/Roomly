import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private router: Router){}
  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map((user) =>{
        if(user) return true;
        this.toastr.error('Please Login');
        this.router.navigateByUrl('/login');
      })
    );
  }
  
}
