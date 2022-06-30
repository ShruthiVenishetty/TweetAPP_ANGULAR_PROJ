import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPassword, Register, Tweet } from './Tweet-app.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class TweetAppService {
   



    // addr:{baseUrl:string}[]=Urls;
    readonly baseURL = environment.baseUri;
    readonly token = localStorage.getItem('token');


    constructor(private http: HttpClient) { }

    getAllTweets(): Observable<any> {
        console.log(this.token);
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ this.token
        }
        
        return this.http.get(this.baseURL + '/all', { 'headers': headers });
    }
    login(email: string, password: string): Observable<any> {
        return this.http.post(this.baseURL + '/login', {
            "email": email,
            "password": password
        }, { observe: 'response' })
    }

    registerPage(register: Register): Observable<any> {

        return this.http.post(this.baseURL + '/register', {
            "email": register.email,
            "firstName": register.firstName,
            "lastName": register.lastName,
            "password": register.password,
            "confirmPassword": register.confirmPassword,
            "contact": register.contact,
        
        }, { observe: 'response' });
    }
    getAllUsers(): Observable<any> {
        const headers = {
            'content-type': 'application/json',
        }

        return this.http.get(this.baseURL + '/users/all', { 'headers': headers });
    }
    forgetPassword(email: string, forgot: ForgotPassword): Observable<any> {
        return this.http.put(this.baseURL + '/' + email + '/Forgot', {
            "email": email,
            "password": forgot.password,
            "confirmPassword": forgot.confirmPassword
        }, { observe: 'response' })
    }
    getTweetsByUser(id: number): Observable<any> {
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ this.token
        }

        return this.http.get(this.baseURL + '/user/search' + id, { 'headers': headers });
    }
    addTweet(tweet: any): Observable<any> {
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ this.token
        }

        return this.http.post(this.baseURL + '/username/add', {
            "content": tweet.content,
            "userId": tweet.userId

        },{'headers': headers});
    }
    updateTweet(tweet: any, tweetId: number): Observable<any> {
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ this.token
        }
        return this.http.put(this.baseURL + '/username/update/' + tweetId, {
            "content": tweet.content,
            "userId": tweet.userId

        },{'headers': headers});
    }
    deleteTweet(tweetId: number): Observable<any> {
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ this.token
        }
        return this.http.delete(this.baseURL + '/username/delete/' + tweetId, { 'headers': headers });
    }
    likeTweet(tweetId: number): Observable<any> {
       
        const headers = {
            'content-type': 'application/json'
        }

        return this.http.put(this.baseURL + '/username/like/' + tweetId, { 'headers': headers });
    }
    unlikeTweet(tweetId: number): Observable<any> {
        const headers = {
            'content-type': 'application/json'
        }
        return this.http.put(this.baseURL + '/username/unlike/' + tweetId, { 'headers': headers }, { observe: 'response' });
    }
    replyToTweet(tweet: any, tweetId: number): Observable<any> {
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'Bearer '+ this.token
        }
        return this.http.post(this.baseURL + '/username/reply/' + tweetId, {

            "parentTweetId": tweetId,
            "content": tweet.content,
            "userId": tweet.userId

        },{'headers': headers});;
    }

}