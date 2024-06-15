import { Component } from '@angular/core';
import { Theatre } from '../model/theatre';
import { TheatreService } from '../services/theatre.service';
import { TheatreOrder } from '../model/theatre-order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theatre-owner-home',
  templateUrl: './theatre-owner-home.component.html',
  styleUrls: ['./theatre-owner-home.component.css']
})
export class TheatreOwnerHomeComponent {
  currentTheatre:Theatre={};
  orders:TheatreOrder[]=[];
  constructor(private theatreService:TheatreService,private router:Router){
      let token:string|null=localStorage.getItem("currentTheatreToken");
      if(token !==null){
        console.log(token);
      this.theatreService.getTheatreByEmailID(token).subscribe(
        success=>{
            this.currentTheatre=success;
            // console.log(this.currentTheatre);
            if(this.currentTheatre.orders)
            this.orders=this.currentTheatre.orders;
          this.orders.forEach(e=>{
            this.getProperFormattedDate(e.date);
          })
        },
        failure=>{
          console.log(failure);
        }
      )
    }
  }
  getProperFormattedDate(date:Date|undefined){
    if(date){
      let newDate:Date=new Date(date);
      console.log(newDate);
      console.log(newDate.toString().substring(4,7));
      console.log(newDate.toString().substring(8,10));
      console.log(newDate.toString().substring(11,15));
      let str:string=newDate.toString().substring(8,10)+" "+newDate.toString().substring(4,7)+" "+newDate.toString().substring(11,15);
      return str;
    }
    return;
  }
  logout(event:Event){
    event.preventDefault();
    localStorage.setItem("currentTheatreToken","");
      this.router.navigateByUrl("/")
  }
}
