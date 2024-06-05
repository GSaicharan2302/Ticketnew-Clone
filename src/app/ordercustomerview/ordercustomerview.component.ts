import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { TheatreService } from '../services/theatre.service';
import { Customer } from '../model/customer';
import { Theatre } from '../model/theatre';
import { Movie } from '../model/movie';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-ordercustomerview',
  templateUrl: './ordercustomerview.component.html',
  styleUrls: ['./ordercustomerview.component.css'],
  providers:[DatePipe]

})
export class OrdercustomerviewComponent {
  isShowTheatreList:boolean=false;
  isShowMovieList:boolean=false;
  currentCustomer?:Customer={};
  cityTheatreList:Theatre[]=[];
  movies:Movie[]=[];
  movie:Movie={};
  orders:Order[]=[];
  currentCity :string="";
  overallTheatreList:Theatre[]=[];
  theatreList:Theatre[]=[];
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private movieService:MovieService,private datePipe:DatePipe,private customerService:CustomerService,private theatreService:TheatreService,private orderService:OrderService){
    let token:string|null=localStorage.getItem("customerToken");
    this.getMoviesByCity();
    if(token!==null && token!=""){
      this.customerService.getCustomer(token).subscribe(
        success=>{
            this.currentCustomer=success;
            if(this.currentCustomer.emailID)
            this.orderService.getOrdersByCustomerID(this.currentCustomer.emailID).subscribe(
          success=>{
            this.orders=success;
          },
          failure=>{
            console.log(failure);
          }
        )
        },
        failure=>{
          console.log(failure);
        }
      )
    }
    
  }
  goToHome(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("");
  }
  showMovieList(){
    this.isShowMovieList=true;
    this.isShowTheatreList=false;
  }
  showTheatreList(){
    this.isShowTheatreList=true;
    this.isShowMovieList=false;
  }
  hideTheatreList(){
    this.isShowTheatreList=false;
  }  
  logout(){
    localStorage.setItem("customerToken","");
    this.router.navigateByUrl("/");
  }
  hideMovieList(){
    this.isShowMovieList=false;
  }
  getTheatresByCity(){
    let city:string|null=localStorage.getItem("city");
    if(city!=null){
      this.theatreService.getTheatresByCity(city).subscribe(
        success=>{
            this.cityTheatreList=success;
        },
        failure=>{
            console.log(failure);
        }
      )

    }
  }
  getMoviesByCity(){
    let city:string|null=localStorage.getItem("city");
    if(city!=null){
      this.movieService.getMoviesByCity(city).subscribe(
        success=>{
          this.movies=success;
        },
        failure=>{
          console.log(failure);
        }
      )
    }
  }
  getNewMovie(movieID:string|undefined){
    if(movieID){
      movieID=movieID.substring(1);
      localStorage.setItem("movieID",movieID);
      this.getMovieByID();
      this.getTheatresByMovieID();
    }
  }
  getTheatresByMovieID(){
    let id:string|null=localStorage.getItem("movieID");
    let city:string|null=localStorage.getItem("city");
    if(id!=null && city!=null){
      this.currentCity=city;
      this.movieService.getTheatresByMovieID(id,city).subscribe(
        success=>{
            this.theatreList=success;
            this.overallTheatreList=this.theatreList;
            console.log(this.theatreList);
            let currentDate:Date=new Date();
            console.log(currentDate.getDate());            
        },
        failure=>{
            console.log(failure);
        }
      )
    }
  }
  getMovieByID(){
    let id:string|null=localStorage.getItem("movieID");
    if(id!==null){
      this.movieService.getMovieByID(id).subscribe(
        success=>{
          this.movie=success;
          console.log(this.movie);
        },
        failure=>{
          console.log(failure);
        }
      )
    }
  }
  getLanguagesByTheatreList(m:Movie){
    let langArray:string[]=[];
    console.log(m.movieName);
    m.theatres?.forEach(e=>{
      if(e.city===this.currentCity && e.languages){
          e.languages.forEach(item=>{
            if(!langArray.includes(item)){
              langArray.push(item);
            }
          })
      }
    });
    console.log(langArray);
    return langArray.toString();
}
  getSeatsInFormat(seats:string[]|undefined){
   if(seats){
      let ARowSeats:string="A ";
      let BRowSeats:string="B ";
      let CRowSeats:string="C ";
      let DRowSeats:string="D ";
      let ARowSeatsArray:number[]=[];
      let BRowSeatsArray:number[]=[];
      let CRowSeatsArray:number[]=[];
      let DRowSeatsArray:number[]=[];
      let resultString:string="";
      seats.forEach(e=>{
        if(e.charAt(0)==='A'){
          ARowSeatsArray.push(parseInt(e.substring(1)));
        }
        else if(e.charAt(0)==='B'){
          BRowSeatsArray.push(parseInt(e.substring(1)));
        }
        else if(e.charAt(0)==='C'){
          CRowSeatsArray.push(parseInt(e.substring(1)));
        }
        else if(e.charAt(0)==='D'){
          DRowSeatsArray.push(parseInt(e.substring(1)));
        }
      });
      if(ARowSeatsArray.length>0){
        console.log("A "+this.formatSeatSelection(ARowSeatsArray));
        resultString+="A "+this.formatSeatSelection(ARowSeatsArray);
        if(BRowSeatsArray.length>0 || CRowSeatsArray.length>0 || DRowSeatsArray.length>0){
          resultString+=" , ";
        }
      }

      if(BRowSeatsArray.length>0){
        console.log("B "+this.formatSeatSelection(BRowSeatsArray));
        resultString+="B "+this.formatSeatSelection(BRowSeatsArray);
        if((CRowSeatsArray.length>0 && ARowSeatsArray.length==0) || (DRowSeatsArray.length>0 && ARowSeatsArray.length==0)){
          resultString+=" , ";
        }
      }

      if(CRowSeatsArray.length>0){
        console.log("C "+this.formatSeatSelection(CRowSeatsArray));
        resultString+="C "+this.formatSeatSelection(CRowSeatsArray);
        if((DRowSeatsArray.length>0 && ARowSeatsArray.length==0 && BRowSeatsArray.length==0)){
          resultString+=" , "
        }
      }

      if(DRowSeatsArray.length>0){
        console.log("D "+this.formatSeatSelection(DRowSeatsArray));
        resultString+="D "+this.formatSeatSelection(DRowSeatsArray);
      }
      return resultString;
   }
   return ;
}
formatSeatSelection(seats: number[]): string {
  if (seats.length === 0) return "";

  // Sort the seats array
  seats.sort((a, b) => a - b);

  let formattedSeats: string[] = [];
  let start = seats[0];
  let end = seats[0];

  for (let i = 1; i < seats.length; i++) {
    if (seats[i] === end + 1) {
      // If the current seat is the next in sequence, update the end
      end = seats[i];
    } else {
      // If not, push the current range to the formattedSeats array
      if (start === end) {
        formattedSeats.push(`${start}`);
      } else {
        formattedSeats.push(`${start}-${end}`);
      }
      // Update start and end to the new range
      start = seats[i];
      end = seats[i];
    }
  }

  // Push the last range to the formattedSeats array
  if (start === end) {
    formattedSeats.push(`${start}`);
  } else {
    formattedSeats.push(`${start}-${end}`);
  }

  return formattedSeats.join(", ");
}

getFormattedDate(order:Order|undefined){
  // if(order?.orderDate){
  //   let date:Date=order.orderDate;
  // let day:number=date.getDay();
  // let months:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  // let month:string=months[date.getMonth()];
  // let year:number=date.getFullYear();
  // let result:string=day+"-"+month+"-"+year;
  // return result;
  // }
  let date:Date=order?.orderDate?new Date(order?.orderDate):new Date();
  let day:number=date.getDate();
  let months:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let month:string=months[date.getMonth()];
  let year:number=date.getFullYear();
  let result:string=day+"-"+month+"-"+year;
  return result;
}

}
