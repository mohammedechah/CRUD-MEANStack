import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLoading=false
  authStatusSub: Subscription;

  constructor(public authservice:AuthService) {
    this.authStatusSub=Subscription.EMPTY
  }

  ngOnInit(): void {
    this.authStatusSub=this.authservice.getAuthStatusListener()
    .subscribe(authstatus=>{
      this.isLoading=false

    })

  }
  onLogin(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true
      this.authservice.login(form.value.email,form.value.password);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe()
  }
  }



