import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMaterielModule } from "../angular-materiel.module";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";


@NgModule({
  declarations:[
    PostCreateComponent,
    PostListComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterielModule,
    RouterModule

  ]

})
export class PostsModule{

}
