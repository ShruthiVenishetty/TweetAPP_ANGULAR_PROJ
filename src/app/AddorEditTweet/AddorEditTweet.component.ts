
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetAppService } from '../tweet-app.service';

@Component({
    selector: 'app-AddorEditTweet',
    templateUrl: './AddorEditTweet.component.html',
    styleUrls: ['./AddorEditTweet.component.scss']
})
export class AddorEditTweetComponent implements OnInit {
    allTweetList: Array<any>;
    constructor(private formBuilder: FormBuilder, public router: Router, private route: Router, public service: TweetAppService) { }
    AEForm: FormGroup;
    submitted: boolean = false;
    errorResponse: any;
    content: string;
    isedit: boolean = false;
    isComment: boolean = false;
    isAdd: boolean = false;
    precontent: string;
    href: string;
    todo: string;
    id: number;
    isError: boolean = false;
    errorMsg: string;

    ngOnInit() {
        this.href = this.router.url;
        this.todo = this.href.split('/')[1];
        if (this.todo === "addTweet") {
            this.id = 0;
            this.isAdd = true;
            this.AEForm = this.formBuilder.group({
                content: ['', [Validators.required, Validators.maxLength(150)]]
            });
        }
        else if (this.todo === "replyTweet") {
            this.id = Number(this.href.split('/')[2]);
            this.isComment = true;

            this.AEForm = this.formBuilder.group({
                content: [this.precontent, [Validators.required, Validators.maxLength(150)]]
            });
        }
        else if (this.todo === "editTweet") {
            this.id = Number(this.href.split('/')[2]);
            this.isedit = true;
            this.service.getAllTweets().subscribe(response => {
                this.allTweetList = response;


                this.allTweetList.forEach(tweet => {
                    if (tweet.TweetId === this.id) {

                        this.precontent = tweet.Content;
                    }
                });
                this.AEForm = this.formBuilder.group({
                    content: [this.precontent, [Validators.required, Validators.maxLength(150)]]
                });
            });
        }

    }

    onAddEdit() {
        this.submitted = true;

        if (this.submitted) {
            this.content = this.AEForm.controls['content'].value;
            let tweet = {
                content: this.content,
                userId: localStorage.getItem('userId')
            }
            if (this.todo === "addTweet") {
                this.service.addTweet(tweet).subscribe(response => {
                    var res = response.status;

                    if (response.TweetId!==undefined) {
                        this.isAdd = false;
                        this.route.navigate(['tweets'])
                    }
                    else {
                        this.isError = true;

                        this.errorMsg = " Register/Login to add a tweet";

                        setTimeout(() => {
                            this.isError = false;
                        }, 2000);
                    }

                }, (_err: any) => {
                    if (_err.status === 200) {
                        this.isAdd = false;
                        this.route.navigate(['tweets'])
                    }
                    else {
                        this.isError = true;

                        this.errorMsg = " Register/Login to add a tweet";

                        setTimeout(() => {
                            this.isError = false;
                        }, 2000);
                    }

                    this.isError = true;

                    this.errorMsg = " Register/Login to add a tweet";

                    setTimeout(() => {
                        this.isError = false;
                    }, 2000);
                });
            }
            else if (this.todo === "editTweet") {
                this.service.updateTweet(tweet, this.id).subscribe(response => {
                   
                    if (response.TweetId != undefined) {
                        this.isedit = false;
                        this.route.navigate(['tweet/' + this.id])
                    }
                });
            }
            else if (this.todo === "replyTweet") {

                this.service.replyToTweet(tweet, this.id).subscribe(response => {

                    if (response.TweetId != undefined) {
                        this.isComment = false;
                        this.route.navigate(['tweet/' + this.id])
                    }
                });
            }

        }
    }


}