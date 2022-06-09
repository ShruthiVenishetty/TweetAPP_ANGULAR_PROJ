import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetAppService } from '../tweet-app.service';
import { AddorEditTweetComponent } from '../AddorEditTweet/AddorEditTweet.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-tweets',
    templateUrl: './tweets.component.html',
    styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
    tweetList: any = [];
    allTweetList: Array<any>;
    userList: Array<any>;
    isChecked: boolean;
    isError: boolean = false;
    errorMsg: string;
    isSuccess: boolean = false;
    successMsg: string;
    success: string = "success";
    popupComponent: any = AddorEditTweetComponent;
    notauthorized: boolean = true;

    toggle = true;
    constructor(public service: TweetAppService, public route: Router, public dialog: MatDialog) { }

    ngOnInit(): void {
        let userId = localStorage.getItem('userId');
        if (userId === '') {
            this.notauthorized = true;
        }
        else {
            this.notauthorized = false;

        }
        this.service.getAllUsers().subscribe(response => {

            this.userList = response;

            this.service.getAllTweets().subscribe(response => {
                this.allTweetList = response;


                this.allTweetList.forEach(tweet => {
                    tweet.isLiked = false;
                    tweet.commentCount = 0;
                    let user = this.userList.find(u => tweet.UserId === u.LoginId);

                    if (user !== undefined) {
                        tweet.userName = user.FirstName + ' ' + user.LastName;
                        tweet.tweetusername = user.LastName + '_' + user.FirstName;

                    }

                    if (tweet.ParentTweetId === 0) {
                        this.tweetList.push(tweet);
                    }

                });
                this.tweetList.forEach((element: any) => {
                    this.allTweetList.forEach(t => {
                        if (element.TweetId === t.ParentTweetId) {
                            element.commentCount += 1;
                        }
                    })

                });
            });
        });
    }
    onComment(e: any, tweet: any) {
        this.route.navigate(['/tweet/' + tweet.TweetId])
    }
    likeit(tweet: any) {

        this.toggle = !this.toggle;

        this.service.likeTweet(tweet.TweetId).subscribe(response => {

            if (response.status === 200) {
                tweet.LikesCount += 1;
            }
        });
    }
    editTweet(tweet: any) {
        this.route.navigate(['editTweet/' + tweet.TweetId])
    }
    newTweet(e: Event) {
        this.route.navigate(['addTweet'])
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