import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../Tweet-app.model';
import { TweetAppService } from '../tweet-app.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private route: Router, public service: TweetAppService) { }
    registerForm: FormGroup;
    submitted: boolean = false;
    errorResponse:any;
    registration: Register = new Register();
    ngOnInit() {
    
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            Repassword: ['', [Validators.required, Validators.minLength(5)]],
            contact: ['', [Validators.required]]
        });
    }

    onRegister() {
        this.submitted = true;
        if (this.submitted) {
            if (this.registerForm.controls['password'].value == this.registerForm.controls['Repassword'].value) {
            }
        }
        if (this.registerForm.invalid) {
            return;
        }
        if (this.submitted) {
            if (this.registerForm.controls['password'].value == this.registerForm.controls['Repassword'].value) {

                this.registration.firstName = this.registerForm.controls['firstName'].value;
                this.registration.lastName = this.registerForm.controls['lastName'].value;
                this.registration.email = this.registerForm.controls['email'].value;
                this.registration.password = this.registerForm.controls['password'].value;
                this.registration.confirmPassword = this.registerForm.controls['Repassword'].value;
                this.registration.contact = this.registerForm.controls['contact'].value;
                this.service.registerPage(this.registration).subscribe(response => {
                    var res = response.status;
                    if (res == 200) {
                        this.route.navigate(['login'])
                    }
                }, err => this.errorResponse = err);
            }
            else {
            }

        }


     }
}