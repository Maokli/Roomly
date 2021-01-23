import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeNavComponent } from './flat-pages/home-nav/home-nav.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './flat-pages/login-page/login-page.component';
import { AppNavComponent } from './app-pages/app-nav/app-nav.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterPageComponent } from './flat-pages/register-page/register-page.component';
import { MemberListComponent } from './app-pages/members/member-list/member-list.component';
import { MemberDetailComponent } from './app-pages/members/member-detail/member-detail.component';
import { MatchesComponent } from './app-pages/matches/matches.component';
import { MessagesComponent } from './app-pages/messages/messages.component';
import { HomeComponent } from './shared/home/home.component';
import { FlatHomePageComponent } from './flat-pages/flat-home-page/flat-home-page.component';
import { AppHomePageComponent } from './app-pages/app-home-page/app-home-page.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeNavComponent,
    LoginPageComponent,
    AppNavComponent,
    NavBarComponent,
    RegisterPageComponent,
    MemberListComponent,
    MemberDetailComponent,
    MatchesComponent,
    MessagesComponent,
    HomeComponent,
    FlatHomePageComponent,
    AppHomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
