import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginData } from '../model/login-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theatre-login',
  templateUrl: './theatre-login.component.html',
  styleUrls: ['./theatre-login.component.css']
})
export class TheatreLoginComponent {
  emailID:string="";
  otp:string="";
  isEmailIDVisible:boolean=true;
  isOTPVisible:boolean=false;
  constructor(private authService:AuthService,private router:Router){}
  getOTP(){
    this.authService.getOTP(this.emailID).subscribe(
      success=>{
          this.isOTPVisible=true;
          this.isEmailIDVisible=false;
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  login(){
    let oneTimePassword:number=parseInt(this.otp);
    let loginData:LoginData={};
    loginData.emailID=this.emailID;
    loginData.otp=oneTimePassword;
      this.authService.login(loginData).subscribe(
          success=>{
            if(success.token)
              localStorage.setItem("currentTheatreToken",success.token);
              this.router.navigateByUrl("/theatreownerhome");
          },
          failure=>{
              console.log(failure);
          }
      )
  }
  

}
