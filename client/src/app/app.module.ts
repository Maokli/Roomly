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

@NgModule({
  declarations: [
    AppComponent,
    HomeNavComponent,
    LoginPageComponent,
    AppNavComponent,
    NavBarComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
