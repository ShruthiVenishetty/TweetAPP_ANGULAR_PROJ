import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetAppService } from '../tweet-app.service';

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private route: Router, public service: TweetAppService) { }
    userList: any;
    ngOnInit() {
        this.service.getAllUsers().subscribe(response => {

            this.userList = response;

        });
    }
}