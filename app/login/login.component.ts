import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginData } from '../model/login-data';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailID:string="";
  otp:string="";
  resultOTP:string="";
  isemailIDContainerVisible:boolean=true;
  isOTPContainerVisible:boolean=false;
  isSendOTPBtnVisible:boolean=true;
  isLoginBtnVisible:boolean=false;
  loginData:LoginData={};
  isLoginSuccess:boolean=false;
  constructor(private authService:AuthService,private router:Router){

  }
  getOTP(){
    this.authService.getOTP(this.emailID).subscribe(
      success=>{
        this.resultOTP=success.toString();
        console.log(success);
        this.isemailIDContainerVisible=!this.isemailIDContainerVisible;
        this.isOTPContainerVisible=!this.isOTPContainerVisible;
        this.isSendOTPBtnVisible=!this.isSendOTPBtnVisible;
        this.isLoginBtnVisible=!this.isLoginBtnVisible;
        this.loginData.emailID=this.emailID;
      }
      ,
      failure=>{
        console.log(failure);
      }
    )
  }
  login(){
    this.loginData.otp=parseInt(this.otp);
    this.authService.login(this.loginData).subscribe(
      success=>{
        console.log(success);
        if(success.token)  
        localStorage.setItem("customerToken",success.token);
        this.isLoginSuccess=true;    
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  register(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("/registerView");
  }
}
