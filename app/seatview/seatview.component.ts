import { Component } from '@angular/core';
import { TheatreService } from '../services/theatre.service';
import { TheatreOrder } from '../model/theatre-order';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movie.service';
import { Theatre } from '../model/theatre';
import { Order } from '../model/order';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-seatview',
  templateUrl: './seatview.component.html',
  styleUrls: ['./seatview.component.css']
})
export class SeatviewComponent {
  bookedSeatList:string[]=[];
  movie:Movie={};
  theatre:Theatre={};
  currentLanguage:string="";
  currenttheatreID:string="";
  currentShow:string="";
  ticketPrice:number=0;
  currentScreen:string="";
  currentDate:number=0;
  dateString:string="";
  isseatSelected:boolean[][]=[];
  seatsSelcted:string[]=[];
  currentCustomer:Customer={};
    constructor(private theatreService:TheatreService,private activatedRoute:ActivatedRoute,private movieService:MovieService,private router:Router,private customerService:CustomerService){
      this.activatedRoute.paramMap.subscribe(
        data=>{
            let theatreID:string=data.get("theatreID")??"";
            this.currenttheatreID=theatreID;
            let str:string="2024-05-16";
            let currentDate:string|null=localStorage.getItem("currentDate");
            let customerToken:string|null=localStorage.getItem("customerToken");
            console.log("Current Date in SeatView Component is : "+currentDate);
            let show:string|null=localStorage.getItem("showTime");
            let screen:string|null=localStorage.getItem("screen");
            let movieID:string|null=localStorage.getItem("movieID");
            console.log("Movie ID in constructor is : "+movieID);
            this.getMonthName();
            if(customerToken!==null){
                this.customerService.getCustomer(customerToken).subscribe(
                  success=>{
                      this.currentCustomer=success;
                  },
                  failure=>{
                      console.log(failure);
                  }
                )              
            }
            if(show!==null && screen!==null && movieID!==null){
              console.log(currentDate);
              if(currentDate!==null){
              let newDate:Date=new Date(currentDate);
              console.log(newDate);
              let date:number=newDate.getDate();
              let month:number=newDate.getMonth()+1;
              let year:number=newDate.getFullYear();
              this.dateString=year+"-"+month+"-"+date;
              
            }
              this.currentShow=show;
              this.currentScreen=screen;
              console.log("DateString : "+this.dateString);
              console.log(this.currentShow);
              console.log(this.currentScreen);
              console.log("datestring value in constructor is : "+new Date(this.dateString));
              console.log("str value in constructor is : "+new Date(str));
            let obj:any={date:this.dateString,showTime:show,screen:screen};
            console.log(obj);
            this.theatreService.getSeatsByDateAndShowtimeAndScreen(theatreID,obj).subscribe(
              success=>{
                this.bookedSeatList=success;
                // console.log(this.bookedSeatList);
                console.log("Booked Seat List in constructor() : "+this.bookedSeatList);

              },
              failure=>{
                console.log(failure);
              }
            )
            this.movieService.getMovieByID(movieID).subscribe(
              success=>{
                  this.movie=success;
                  console.log(this.movie);
                  this.getRemainingShowTimes();
              },
              failure=>{
                  console.log(failure);
              }
            )
            this.theatreService.getTheatreByID(theatreID).subscribe(
              success=>{
                this.theatre=success;
                console.log(this.theatre);
              },
              failure=>{
                console.log(failure);
              }
            )
            for(let i=0;i<=4;i++){
              this.isseatSelected[i]=[];
              for(let j=0;j<=30;j++){
                this.isseatSelected[i][j]=false;
                console.log(this.isseatSelected);
              }
            }
        }}
      )
     
    }
    getSeatBookedStatus(seatID:string){
        if(this.bookedSeatList.includes(seatID)){
          return true;
        }
        return false;
    }
    getCurrentLanguage(){
      console.log(this.movie.theatres?.length);
      this.movie.theatres?.forEach(e=>{
        console.log(e.name);
        console.log(this.currenttheatreID);
        if(e.name?.substring(1)===this.currenttheatreID){
          e.showtimeList?.forEach(item=>{
                
              if(item.screen===this.currentScreen && item.showTime===this.currentShow && item.language){
                  this.currentLanguage=item.language;
                  console.log("Item Language is : "+item.language);
              }
          })
        }
      });
      return this.currentLanguage;
    }
    getDay(){
      let date:Date=new Date(this.dateString);
      console.log(date.toString().substring(0,3));
      return date.getDate();
    }
    getMonthName(){
      let months:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      console.log("Datestring value is : "+this.dateString);
      console.log("Month that is displayed in UI"+months[new Date(this.dateString).getMonth()]);
      return months[new Date(this.dateString).getMonth()];
    }
    getToday(){
      return new Date().toString().substring(0,3);
    }
    getAreaOfTheatre(){
      return this.theatre.theatreAddress?.area;
    }
    getRemainingShowTimes(){
      let remainingShowTimes:string[]=[];
      this.movie.theatres?.forEach(e=>{
        if(e.name?.substring(1)===this.currenttheatreID){
            console.log("ShowTimingListTheatre is "+e);
            e.showtimeList?.forEach(item=>{
              if(item.screen===this.currentScreen && item.showTime){
                  remainingShowTimes.push(item.showTime);
              }
            })
        }
      })
      console.log(remainingShowTimes);
      return remainingShowTimes;
    }
    checkRemainingShowTimesExist(){
      if(this.getRemainingShowTimes().length>0){
        return true;
      }
      else{
        return false;
      }
    }    
    gotoPreviousPage(event:Event){
      event.preventDefault();
      console.log("Movie ID after clicking back button "+this.movie.movieID?.substring(1));
      this.router.navigateByUrl("/movieView/"+this.movie.movieID?.substring(1));
    }
    isCurrentShowScreen(show:string){
      if(show===this.currentShow){
        return true;
      }
      return false;
    }
    changeCurrentShow(show:string){
      this.currentShow=show;
      let tempDate:string|null=localStorage.getItem("currentDate");

      let screen:string|null=localStorage.getItem("screen");
      if(tempDate!==null && screen!==null && this.theatre.theatreID){
        let currentDate:Date=new Date(tempDate);
        console.log("Date in changeCurrentShow() function "+currentDate);
        let obj:any={date:this.dateString,showTime:this.currentShow,screen:screen};
        this.theatreService.getSeatsByDateAndShowtimeAndScreen(this.theatre.theatreID?.substring(1),obj).subscribe(
          success=>{
              this.bookedSeatList=success;
              console.log("Booked Seat List in changeCurrentShow() : "+this.bookedSeatList);
          },
          failure=>{
              console.log(failure);
          }
        )
      }
    }
    selectSeats(id:string,seatNo:number){
      let rowNo:number=0;
      if(id.substring(0,1)==="A"){
        rowNo=1;
      }
      else if(id.substring(0,1)==="B"){
        rowNo=2;
      }
      else if(id.substring(0,1)==="C"){
        rowNo=3;
      }
      else{
        rowNo=4;
      }
      console.log(this.isseatSelected[rowNo][seatNo]);
      if(this.isseatSelected[rowNo][seatNo]===true){
        this.seatsSelcted=this.seatsSelcted.filter(e=>e!==id);
      }
      else{
      this.seatsSelcted.push(id);}
      this.isseatSelected[rowNo][seatNo]=!this.isseatSelected[rowNo][seatNo];
     
    }
    bookTickets(event:Event){
      event.preventDefault();
      console.log(this.seatsSelcted);
      console.log(this.currentScreen);
      console.log(this.getCurrentLanguage());
      console.log(localStorage.getItem("currentDate")); 
      console.log(this.seatsSelcted.length*this.getTicketPrice());
      let customerOrder:Order={};
      let customerToken:string|null=localStorage.getItem("customerToken");
      let orderedDateString:string|null=localStorage.getItem("currentDate");
      if(orderedDateString!==null && customerToken!==null){
        customerOrder.amount=this.seatsSelcted.length*this.getTicketPrice();
        customerOrder.customername=this.currentCustomer.customername;
        customerOrder.emailID=this.currentCustomer.emailID;
        customerOrder.language=this.getCurrentLanguage();
        customerOrder.movieID=this.movie.movieID;
        customerOrder.moviename=this.movie.movieName;
        customerOrder.noOfSeats=this.seatsSelcted.length;
        customerOrder.orderDate=new Date(orderedDateString);
        console.log("Customer Order Date : "+customerOrder.orderDate)
        customerOrder.screen=this.currentScreen;
        customerOrder.seats=this.seatsSelcted;
        customerOrder.theatreID=this.theatre.theatreID;
        customerOrder.theatrename=this.theatre.theatreName;
        customerOrder.time=this.currentShow;
        this.customerService.addOrder(customerOrder,customerToken).subscribe(
          success=>{
              this.router.navigateByUrl("/orderview");
          },
          failure=>{
              console.log(failure);
          }
        )
      }
      
    }
    getPrice(){
      let obj:any={showTime:this.currentShow,screen:this.currentScreen};
      if(this.theatre.theatreID && this.movie.movieID){
        this.movieService.getAmount(obj,this.theatre.theatreID?.substring(1),this.movie.movieID?.substring(1),"2D").subscribe(
          success=>{
              this.ticketPrice=success;
          },
          failure=>{
              console.log(failure);
          }
        )
      }
      
    }
    getTicketPrice(){
      let amt:number=0;
      this.movie.theatres?.forEach(e=>{
          if(e.name===this.theatre.theatreID){
                e.showtimeList?.forEach(item=>{
                    if(item.screen===this.currentScreen && item.showTime===this.currentShow && item.amount){
                      amt=item.amount;
                    }
                })
          }
      })
      return amt;
    }
    

}
