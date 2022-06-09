import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TweetsComponent } from './tweets/tweets.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AddorEditTweetComponent } from './AddorEditTweet/AddorEditTweet.component';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IconsModule } from 'angular-bootstrap-md'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { UserListComponent } from './userlist/userlist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ParentTweetComponent } from './ParentTweet/ParentTweet.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    ParentTweetComponent,
    ModalPopupComponent,
    LoginComponent,
    TweetsComponent,
    ForgotComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    UserListComponent,
    AddorEditTweetComponent
  ],
  imports: [
    MatFormFieldModule,
    NgbModule,
    MatIconModule,
    IconsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
