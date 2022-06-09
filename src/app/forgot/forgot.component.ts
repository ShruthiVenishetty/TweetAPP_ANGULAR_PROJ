import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword, Register } from '../Tweet-app.model';
import { TweetAppService } from '../tweet-app.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
    forgotPasswordForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private route: Router, public service: TweetAppService) { }

    ngOnInit() {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            Repassword: ['', [Validators.required, Validators.minLength(5)]]
        });
    }
    onSubmit() {
        let forgotPassword: ForgotPassword = {

            email: this.forgotPasswordForm.controls['email'].value,
            password: this.forgotPasswordForm.controls['password'].value,
            confirmPassword: this.forgotPasswordForm.controls['Repassword'].value,

        }
        this.service.forgetPassword(forgotPassword.email, forgotPassword).subscribe(response => {
            if (response.status === 200) {
                this.route.navigate(['login'])

            }
            else {

            }
        });
    }
}