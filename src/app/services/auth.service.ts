import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LoginData } from '../model/login-data';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://localhost:3333/movie/auth"
  constructor(private httpClient:HttpClient) { }
  getOTP(emailID:string){
      let user:User={};
      user.emailID=emailID;
      return this.httpClient.post(this.url+"/getOTP",user);
  }
  login(loginData:LoginData){
      return this.httpClient.post<Token>(this.url+"/login",loginData);
  }
}
