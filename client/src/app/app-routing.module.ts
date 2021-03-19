import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesComponent } from './app-pages/matches/matches.component';
import { MemberDetailComponent } from './app-pages/members/member-detail/member-detail.component';
import { MemberListComponent } from './app-pages/members/member-list/member-list.component';
import { MessagesComponent } from './app-pages/messages/messages.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { LoginPageComponent } from './flat-pages/login-page/login-page.component';
import { RegisterPageComponent } from './flat-pages/register-page/register-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path:'find-roommates', component:MemberListComponent},
      {path:'user/:username', component:MemberDetailComponent},
      {path:'matches', component:MatchesComponent},
      {path:'messages', component:MessagesComponent},
    ]
  },
  {path:'errors', component:TestErrorsComponent},
  {path:'not-found', component:NotFoundComponent},
  {path:'server-error', component:ServerErrorComponent},
  {path:'**', component:NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
