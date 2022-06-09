export class Register{
    email: string;
    firstName:string;
    lastName: string;
    password: string;
    confirmPassword: string;
    contact: string;
  }
export class Login {
  email: string;
  password: string
}
export class Tweet {
  tweetId: number;
  parentTweetId: number;
  content: string;
  userId: number;
  creationTime: Date;
  updatedTime: Date;
  likesCount: number;
  userName: string;
  tweetusername: string;
  commentCount:number;
  isLiked:boolean;
}
export class ForgotPassword {
  email: string;
  password: string;
    confirmPassword: string;
}
// export class DisplayTweet {
//   tweetId: number;
//   parentTweetId: number;
//   content: string;
//   userId: number;
//   userName: string;
//   creationTime: Date;
//   updatedTime: Date;
//   likesCount: number;
// }