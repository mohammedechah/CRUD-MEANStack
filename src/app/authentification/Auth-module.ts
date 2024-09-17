import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularMaterielModule } from "../angular-materiel.module";
import { AuthRoutingModule } from "./Auth-Routing";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@NgModule({
  declarations:[
    LoginComponent,
    SignUpComponent
  ],
  imports:[
    CommonModule,
    AngularMaterielModule,
    FormsModule,
    AuthRoutingModule

  ]

})
export class AuthModule{}
