import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentification/auth.service';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit,OnDestroy {
  enteredcontent="";
  enteredtitle= "";
  isLoading=false;
  form:FormGroup;
  imagePreview:string|null=null
  private mode ='create';
  private postId: string|null  = null ;
  post :Post={} as Post;
  authStatuSub:Subscription;


  constructor(
    public PostsService : PostsService,
    public route:ActivatedRoute,
    public authservice:AuthService){
      this.form=new FormGroup( {
        title:new FormControl(null,{
        validators:[Validators.required ,Validators.minLength(3)]
        }),
        content:new FormControl(null,{
        validators:[Validators.required]}),
        image:new FormControl(null,{
         validators:[Validators.required]}),
      }),
      this.authStatuSub=Subscription.EMPTY

    }


    onSavePost() {

     if (this.form.invalid) {
       return;
      }
      this.isLoading=true;
      if (this.mode === "create") {
        this.PostsService.addPost(
          this.form.value.title,
          this.form.value.content,
          this.form.value.image);
      } else {
        this.PostsService.updatePost(
          this.postId as string,
          this.form.value.title,
          this.form.value.content,
          this.form.value.image
        );

      }
      this.form.reset();
    }


    ngOnInit() {
      this.authStatuSub=this.authservice.getAuthStatusListener().subscribe(
        authStatu=>
        {this.isLoading=false;}
      );
      this.form = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        content: new FormControl(null, { validators: [Validators.required] }),
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("postId")) {
          this.mode = "edit";
          this.postId = paramMap.get("postId");
          this.isLoading = true;
          this.PostsService.getPost(this.postId as string).subscribe(postData => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              imagepath: postData.imagepath,
              creator:postData.creator
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagepath
            });
          });
        } else {
          this.mode = "create";
          this.postId = null;
        }
      });
    }
    onImagePicked(event: Event) {
      const target= event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.form.patchValue({ image: file });
      this.form.get("image")?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    ngOnDestroy(){
      this.authStatuSub.unsubscribe()
    }


}
