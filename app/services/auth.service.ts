import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LoginData } from '../model/login-data';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://localhost:3333/movie/auth";
  isCustomerLoggedIn?:boolean;
  isTheatreLoggedIn?:boolean;
  constructor(private httpClient:HttpClient) { 
    let tempCustomerToken:string|null=localStorage.getItem("customerToken");
    if(tempCustomerToken!==null && tempCustomerToken!==""){
      this.isCustomerLoggedIn=true;
    }
  }
  getOTP(emailID:string){
      let user:User={};
      user.emailID=emailID;
      return this.httpClient.post(this.url+"/getOTP",user);
  }
  login(loginData:LoginData){
      return this.httpClient.post<Token>(this.url+"/login",loginData);
  }
}
