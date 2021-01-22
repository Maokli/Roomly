import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './flat-pages/login-page/login-page.component';
import { RegisterPageComponent } from './flat-pages/register-page/register-page.component';

const routes: Routes = [
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
