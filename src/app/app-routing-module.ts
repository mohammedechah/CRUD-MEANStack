import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AuthGuard } from "./authentification/auth.guards";

import { PostCreateComponent } from "./post/post-create/post-create.component";
import { PostListComponent } from "./post/post-list/post-list.component";

const routes : Routes=[
  {path:'',component:PostListComponent},
  {path:'create',component:PostCreateComponent, canActivate: [AuthGuard] },
  {path:'edit/:postId',component:PostCreateComponent, canActivate: [AuthGuard] },
  {path:'auth',loadChildren: () => import('./authentification/Auth-module').then(m=>
   m.AuthModule
  )},

];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers: [AuthGuard]

})

export class AppRoutingModule {

}
