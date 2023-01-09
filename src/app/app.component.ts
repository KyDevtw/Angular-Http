import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost()
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // params API URL, body data
    this.http.post(
      'https://angular-backend-practice-37d63-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(
      res => {
        console.log(res)
      }
    );
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost()
  }

  onClearPosts() {
    // Send Http request
  }


private fetchPost() {
  this.http.get('https://angular-backend-practice-37d63-default-rtdb.firebaseio.com/posts.json')
  // observerable 運算 使用 .pipe()
  .pipe(
    map(resData => {
      const postArray = [];
      for ( const key in resData ) {
        if ( resData.hasOwnProperty(key) ) {
          postArray.push({ ...resData[key], id: key });
        }
      }
      return postArray;
    })
  )
  .subscribe(
    post => {
      console.log(post)
    }
  )
}
}
