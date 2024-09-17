import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy {
  isLoading=false
  private authStatusSub:Subscription

  constructor(public authservice:AuthService) {
    this.authStatusSub=Subscription.EMPTY
   }

  ngOnInit(): void {
    this.authStatusSub=this.authservice.getAuthStatusListener()
    .subscribe(authstatus=>{
      this.isLoading=false

    })

  }
  onSignup(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true;
    this.authservice.createUser(form.value.email,form.value.password);


  }
  ngOnDestroy():void{
    this.authStatusSub.unsubscribe()

  }

}
