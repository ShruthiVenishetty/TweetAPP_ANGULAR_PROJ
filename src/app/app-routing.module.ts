import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddorEditTweetComponent } from './AddorEditTweet/AddorEditTweet.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ParentTweetComponent } from './ParentTweet/ParentTweet.component';
import { RegisterComponent } from './register/register.component';
import { TweetsComponent } from './tweets/tweets.component';
import { UserListComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: "header", component: HeaderComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "tweets", component: TweetsComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "userlist", component: UserListComponent },
  { path: 'tweet/:id', component: ParentTweetComponent },
  { path: 'editTweet/:id', component: AddorEditTweetComponent },
  { path: 'addTweet', component: AddorEditTweetComponent },
  { path: 'replyTweet/:id', component: AddorEditTweetComponent },

  { path: '', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
