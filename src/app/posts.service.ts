import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class PostsService {

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content}
    this.http.post<{name: string}>(
      'https://angular-backend-practice-37d63-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(
      res => {
        console.log(res)
      }
    );
  }

  fetchPosts() {
    return this.http.get<{[key: string]: Post}>('https://angular-backend-practice-37d63-default-rtdb.firebaseio.com/posts.json')
    // observerable 運算 使用 .pipe()
    .pipe(
      map(resData => {
        const postArray: Post[] = [];
        for ( const key in resData ) {
          if ( resData.hasOwnProperty(key) ) {
            postArray.push({ ...resData[key], id: key });
          }
        }
        return postArray;
      })
    )
  }
}
