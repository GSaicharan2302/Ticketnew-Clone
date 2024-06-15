import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class LoginGuard implements CanActivate{
    customerToken:string="";
    theatreToken:string="";
    constructor(private authService:AuthService,private router:Router){
        let token:string|null=localStorage.getItem("customerToken");
        if(token!==null){
            this.customerToken=token;
            console.log("Customer Token in LoginGuard class : "+this.customerToken);
        }
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let token:string|null=localStorage.getItem("customerToken");
        if(token!==null && token!==""){
            return true;
        }
        else{
            return this.router.navigateByUrl("/");
        }
    }
}
