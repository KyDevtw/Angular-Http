import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching: boolean = false;

  constructor(
    private http: HttpClient,
    private postService: PostsService
    ) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      post => {
        this.isFetching = false;
        this.loadedPosts = post;
      }
    )
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // params API URL, body data
    // this.http.post<{name: string}>(
    //   'https://angular-backend-practice-37d63-default-rtdb.firebaseio.com/posts.json',
    //   postData
    // ).subscribe(
    //   res => {
    //     console.log(res)
    //   }
    // );
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // this.fetchPost()
    // this.postService.fetchPosts()
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      post => {
        this.isFetching = false;
        this.loadedPosts = post;
      }
    )
  }

  onClearPosts() {
    // Send Http request
  }


  private fetchPost() {
    // this.isFetching = true;
    // http type 可以在 method 後擴充<T>定義
    // this.http.get<{[key: string]: Post}>('https://angular-backend-practice-37d63-default-rtdb.firebaseio.com/posts.json')
    // // observerable 運算 使用 .pipe()
    // .pipe(
    //   map(resData => {
    //     const postArray: Post[] = [];
    //     for ( const key in resData ) {
    //       if ( resData.hasOwnProperty(key) ) {
    //         postArray.push({ ...resData[key], id: key });
    //       }
    //     }
    //     return postArray;
    //   })
    // )
    // .subscribe(
    //   post => {
    //     this.isFetching = false;
    //     this.loadedPosts = post;
    //   }
    // )
  }
}
