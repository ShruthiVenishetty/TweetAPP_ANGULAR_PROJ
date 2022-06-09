import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../Tweet-app.model';
import { TweetAppService } from '../tweet-app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private route: Router, public service: TweetAppService) { }
    LoginForm: FormGroup;
    submitted: boolean = false;
    errorResponse: any;
    login: Login = new Login();
    email: string;
    password: string;
    isUserLoggedIn: boolean = false;
    isError: boolean = false;
    errorMsg: string;
    isSuccess: boolean = false;
    successMsg: string;

    ngOnInit() {
        this.LoginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    onLogin() {
        this.submitted = true;
        if (this.submitted) {
            this.email = this.LoginForm.controls['email'].value;
            this.password = this.LoginForm.controls['password'].value;

            this.service.login(this.email, this.password).subscribe(response => {
                var res = response.status;

                if (res == 200) {
                    localStorage.setItem('token', response.body.Token);
                    localStorage.setItem('userId', response.body.UserId);
                    localStorage.setItem('role', response.body.Role);

                    this.isSuccess = true;

                    this.successMsg = " Logged in " + response.body.UserId;
                    setTimeout(() => {
                        this.isSuccess = false;
                        this.route.navigate(['tweets'])
                    }, 2000);



                }
                else {

                    this.isError = true;

                    this.errorMsg = " Unable to login Please check the details";

                    setTimeout(() => {
                        this.isError = false;
                    }, 2000);


                }
            }, (_err: any) => {
                this.isError = true;

                this.errorMsg = " Unable to login Please check the details";

                setTimeout(() => {
                    this.isError = false;
                }, 2000);
            });

        }
    }

}