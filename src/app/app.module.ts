import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing-module';
import { AuthInterceptor } from './authentification/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterielModule } from './angular-materiel.module';
import { PostsModule } from './post/posts.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterielModule,
    PostsModule

  ],
  providers: [
  {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],

  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]

})
export class AppModule { }
