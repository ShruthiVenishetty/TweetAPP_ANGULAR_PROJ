import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
constructor(private route: Router){}
    ngOnInit(): void {
       
    }
    showRegister()
    {
        this.route.navigate(['register'])
    }
    showUsers()
    {
        this.route.navigate(['userlist'])
    }
    Login()
    {
        this.route.navigate(['login'])
    }
    Tweets()
    {
        this.route.navigate(['tweets'])
    }
    logout()
    {
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        localStorage.setItem('role', '');
        this.route.navigate(['login'])
    }
    
}
