import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeNavComponent } from './flat-pages/home-nav/home-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './flat-pages/login-page/login-page.component';
import { AppNavComponent } from './app-pages/app-nav/app-nav.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { RegisterPageComponent } from './flat-pages/register-page/register-page.component';
import { MemberListComponent } from './app-pages/members/member-list/member-list.component';
import { MemberDetailComponent } from './app-pages/members/member-detail/member-detail.component';
import { MatchesComponent } from './app-pages/matches/matches.component';
import { MessagesComponent } from './app-pages/messages/messages.component';
import { HomeComponent } from './shared/home/home.component';
import { FlatHomePageComponent } from './flat-pages/flat-home-page/flat-home-page.component';
import { AppHomePageComponent } from './app-pages/app-home-page/app-home-page.component';
import { SharedModule } from './modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './app-pages/members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AnswerPipe } from './pipes/answer.pipe';
import { MemberEditComponent } from './app-pages/members/member-edit/member-edit.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { PhotoEditorComponent } from './app-pages/members/photo-editor/photo-editor.component';
import { TextInputComponent } from './forms/text-input/text-input.component';
import {DateInputComponent} from './forms/date-input/date-input.component';
import { MemberMessagesComponent } from './app-pages/members/member-messages/member-messages.component';
import { MessageCardComponent } from './app-pages/members/member-messages/message-card/message-card.component';


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
    AppHomePageComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    AnswerPipe,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    MessageCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
