import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Register, Tweet } from '../Tweet-app.model';
import { TweetAppService } from '../tweet-app.service';
import { AddorEditTweetComponent } from '../AddorEditTweet/AddorEditTweet.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-ParentTweet',
    templateUrl: './ParentTweet.component.html',
    styleUrls: ['./ParentTweet.component.scss']
})
export class ParentTweetComponent implements OnInit {
    tweetList: any = [];
    allTweetList: Array<any>;
    userList: Array<any>;
    isChecked: boolean;
    isError: boolean = false;
    errorMsg: string;
    isSuccess: boolean = false;
    successMsg: string;
    href: string;
    id: number;
    parentTweet: any;
    toggle = true;
    constructor(public service: TweetAppService, public router: Router, public dialog: MatDialog) { }

    ngOnInit(): void {

        this.href = this.router.url;
        this.id = Number(this.href.split('/')[2]);
        
        this.service.getAllUsers().subscribe(response => {

            this.userList = response;


            this.service.getAllTweets().subscribe(response => {
                this.allTweetList = response;
                this.parentTweet = this.allTweetList.find(t => t.TweetId === this.id);
                this.parentTweet.isLiked = false;
                let user = this.userList.find(u => this.parentTweet.UserId === u.LoginId);

                if (user !== undefined) {
                    this.parentTweet.userName = user.FirstName + ' ' + user.LastName;
                    this.parentTweet.tweetusername = user.LastName + '_' + user.FirstName;
                    this.parentTweet.commentCount = 0;
                }



                this.allTweetList.forEach(tweet => {
                    if (tweet.ParentTweetId === this.id) {

                        tweet.isLiked = false;
                        tweet.commentCount = 0;
                        let user = this.userList.find(u => tweet.UserId === u.LoginId);

                        if (user !== undefined) {
                            tweet.userName = user.FirstName + ' ' + user.LastName;
                            tweet.tweetusername = user.LastName + '_' + user.FirstName;

                        }


                        this.tweetList.push(tweet);
                    }

                });
                this.tweetList.forEach((element: any) => {
                    this.allTweetList.forEach(t => {
                        if (element.TweetId === t.ParentTweetId) {
                            element.commentCount += 1;
                        }
                    });
                    if (this.parentTweet.TweetId === element.ParentTweetId) {
                        this.parentTweet.commentCount += 1;
                    }

                });
            });
        });




    }
    newTweet(e: Event) {
        this.router.navigate(['replyTweet/' + this.parentTweet.TweetId])
    }
    editTweet(tweet: any) {
        this.router.navigate(['editTweet/' + tweet.TweetId])
    }
    delete(tweet: any) {

        this.service.deleteTweet(tweet.TweetId).subscribe(response => {
            if (response.status === 200) {
                this.successMsg = " Deleted Tweet with Id " + tweet.TweetId;
                this.isSuccess = true;
            }
            else {
                this.isError = true;

                this.errorMsg = " Unable to delete tweet with " + tweet.TweetId;

                setTimeout(() => {
                    this.isError = false;
                }, 2000);
            }
        }, (_err: any) => {
            if (_err.status === 200) {

                this.successMsg = " Deleted Tweet with Id " + tweet.TweetId;
                this.isSuccess = true;
                setTimeout(() => {
                    this.isSuccess = false;
                    window.location.reload();
                }, 2000);

            }
            else {
                this.isError = true;

                this.errorMsg = " Unable to delete tweet with " + tweet.TweetId;

                setTimeout(() => {
                    this.isError = false;
                }, 2000);
            }

        });

    }

    likeit(tweet: any) {
        this.toggle = !this.toggle;
        this.service.likeTweet(tweet.TweetId).subscribe(response => {

            if (response.status === 200) {
                tweet.LikesCount += 1;
            }
        });
    }
    editPopUp(content: any) {
        const dialogConfig = new MatDialogConfig();
      
        dialogConfig.disableClose = true;
        dialogConfig.id = "modal-component";
        dialogConfig.height = "350px";
        dialogConfig.width = "600px";
        dialogConfig.data = {
            tweet: content
        }
        const modalDialog = this.dialog.open(AddorEditTweetComponent, dialogConfig);
    }
    onCheck(e: any, tweet: any) {

        tweet.isLiked = !tweet.isLiked;

        if (tweet.isLiked) {
            this.service.likeTweet(tweet.TweetId).subscribe(response => {
                if (response !== undefined) {
                    tweet.LikesCount += 1;
                }
                else {
                    this.isError = true;
    
                    this.errorMsg = " Unable to like tweet with " + tweet.TweetId;
    
                    setTimeout(() => {
                        this.isError = false;
                    }, 2000);
                }
            }, (_err: any) => {
               
                    this.isError = true;
    
                    this.errorMsg = " Unable to Like/Unlike tweet with " + tweet.TweetId;
    
                    setTimeout(() => {
                        this.isError = false;
                    }, 2000);
                }
    );
        }
        else {
            this.service.unlikeTweet(tweet.TweetId).subscribe(response => {

                if (response.status === 200) {
                    tweet.LikesCount -= 1;
                }
                else {
                    this.isError = true;
    
                    this.errorMsg = " Unable to unlike tweet with " + tweet.TweetId;
    
                    setTimeout(() => {
                        this.isError = false;
                    }, 2000);
                }
            });

        }
    }
}