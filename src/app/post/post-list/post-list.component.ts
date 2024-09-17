import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from 'rxjs';
import { AuthService } from "src/app/authentification/auth.service";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription=Subscription.EMPTY;
  totalPosts=0;
  postPerPages=1;
  currentpage=1;
  pageSizeOptions =[1,2,5,10]
  userIsAuthenticated = false;
  userId:string|null=null;
  private authStatusSub: Subscription=Subscription.EMPTY;

  constructor(public postsService: PostsService,private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPages,this.currentpage);
    this.userId=this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[],postCount :number}) => {
        this.isLoading = false;
        this.totalPosts=postData.postCount;
        this.posts = postData.posts;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId=this.authService.getUserId();

        });
  }

  onDelete(postId: string) {
    this.isLoading=true;
    this.postsService.deletePost(postId as string).subscribe(()=>{
      this.postsService.getPosts(this.postPerPages,this.currentpage)
    },()=>{
      this.isLoading=false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onChangedPage(pageData:PageEvent){
    this.isLoading=true;
    this.currentpage=pageData.pageIndex+1;
    this.postPerPages=pageData.pageSize;
    this.postsService.getPosts(this.postPerPages,this.currentpage);

  }
}
