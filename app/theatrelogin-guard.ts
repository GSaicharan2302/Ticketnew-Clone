import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class TheatreloginGuard implements CanActivate {
    constructor(private router:Router,private authService:AuthService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       let token:string|null=localStorage.getItem("currentTheatreToken");
       if(token!==null && token!==""){
            return true;
       }
       else{
            return this.router.navigateByUrl("/");
       }
    }
}
