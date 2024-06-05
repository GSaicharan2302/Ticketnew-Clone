import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';
import { Theatre } from '../model/theatre';
import { MovieTheatre } from '../model/movie-theatre';
import { DatePipe } from '@angular/common';
import { ShowScreen } from '../model/show-screen';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import { TheatreService } from '../services/theatre.service';
@Component({
  selector: 'app-movieview',
  templateUrl: './movieview.component.html',
  styleUrls: ['./movieview.component.css'],
  providers:[DatePipe]
})
export class MovieviewComponent {
goToOrders(event: Event) {
  event.preventDefault();
  this.router.navigateByUrl("/orderview");
// throw new Error('Method not implemented.');
}
  movie:Movie={};
  theatreList:Theatre[]=[];
  cityTheatreList:Theatre[]=[];
  dayCount:number=0;
  datesList:{day:string,date:number,overallDate:Date}[]=[];
  nextMonthDatesList:{day:string,date:number,overallDate:Date}[]=[];
  overallTheatreList:Theatre[]=[];
  currentDay:Date=new Date();
  currentCustomer?:Customer={};
  currentCity :string="";
  monthChanged:boolean=false;
  currentMonth:string=this.getMonth(new Date());
  nextMonth:string=this.getNextMonth(new Date().getMonth()+1)
  currentLanguageFilter:string="";
  isShowTheatreList:boolean=false;
  isShowMovieList:boolean=false;
  isBackgroundColorSwitch:boolean[]=[false];
  isBackgroundColorOfNextMonthSwitch:boolean[]=[false];
  isTheatreListChanged:boolean=false;
  isLanguageFilterChanged:boolean=false;
  is2DformatSelected:boolean=false;
  is3DformatSelected:boolean=false;
  isIMAX3DformatSelected:boolean=false;
  movies:Movie[]=[];
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private movieService:MovieService,private datePipe:DatePipe,private customerService:CustomerService,private theatreService:TheatreService){
      this.activatedRoute.paramMap.subscribe(
        data=>{
          let str:string=data.get('movieID')??"";
          console.log(str);
          this.getDatesForAWeekThisMonth();
          localStorage.setItem("movieID",str);
          this.getMoviesByCity();
          this.getTheatresByCity();
          this.getMovieByID();
          this.getTheatresByMovieID();
          let token:string|null=localStorage.getItem("customerToken");
          if(token!==null && token!=""){
            this.customerService.getCustomer(token).subscribe(
              success=>{
                  this.currentCustomer=success;
              },
              failure=>{
                console.log(failure);
              }
            )
          }
        }
      )
  }
  getMonth(date:Date){
    let months:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[date.getMonth()];
  }
  getNextMonth(month:number){
    let months:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[month];
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
  getSeatLayout(screen:ShowScreen|undefined,theatreID:string|undefined){
    if(screen && screen.showTime && screen.screen && theatreID){
      localStorage.setItem("showTime",screen.showTime);
      localStorage.setItem("screen",screen.screen);
      this.router.navigateByUrl("/seatView/"+theatreID.substring(1));
    }
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
  showMovieList(){
    this.isShowMovieList=true;
    this.isShowTheatreList=false;
  }
  hideMovieList(){
    this.isShowMovieList=false;
  }
  checkMonth(date:Date){
    // console.log(this.getMonth(date));
    console.log(this.currentMonth);
    if(this.getMonth(date)===this.currentMonth){
      return true;
    }
    else{
      console.log("Month Changed");
      this.monthChanged=true;
      return false;
    }
  }
  changeBackgroundColor(day:any){
    console.log(this.datesList.indexOf(day));
    console.log("Selected Date is : "+day.overallDate);
    localStorage.setItem("currentDate",new Date(day.overallDate).toString());
    this.isBackgroundColorSwitch[this.datesList.indexOf(day)]=!this.isBackgroundColorSwitch[this.datesList.indexOf(day)];

  }
  changeBackgroundColorOfNextMonth(day:any){
    console.log(this.datesList.indexOf(day));
    console.log("Selected Date is : "+day.overallDate);
    localStorage.setItem("currentDate",new Date(day.overallDate).toString());
    this.isBackgroundColorOfNextMonthSwitch[this.nextMonthDatesList.indexOf(day)]=!this.isBackgroundColorOfNextMonthSwitch[this.nextMonthDatesList.indexOf(day)];
  }
  getDay(dateIndex:number){
    let days:string[]=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[dateIndex];
  }
  showTheatreList(){
    this.isShowTheatreList=true;
    this.isShowMovieList=false;
  }
  hideTheatreList(){
    this.isShowTheatreList=false;
  }
 getDatesForAWeekThisMonth(){
  let currentDate:Date=new Date();
  console.log(currentDate.getMonth());
  let nextDate:Date=new Date();
  for(let i=0;i<7;i++){
    nextDate.setDate(currentDate.getDate()+i);
    let day:string=nextDate.toString().substring(0,3);
    let date:number=nextDate.getDate();
    console.log(this.getMonth(nextDate));

    if(this.checkMonth(nextDate)){
      console.log("nextDate value is : "+nextDate)
      let tempDate:Date=new Date();
      tempDate.setDate(nextDate.getDate());
    this.datesList.push({date,day,overallDate:tempDate});
    this.dayCount++;
  }
  else{
    this.getDatesForAWeekNextMonth(nextDate);
    break;
  }
  }
  console.log(this.datesList);
 }
 getDatesForAWeekNextMonth(date:Date){
    let currentDate:Date=date;
    let startDate:Date=new Date(currentDate);
    for(let i=0;i<7-this.dayCount;i++){
      let nextDate:Date=new Date(startDate);
        nextDate.setDate(startDate.getDate()+i);
        console.log(nextDate.toString().substring(0,3));
        let day:string=nextDate.toString().substring(0,3);
        let date:number=nextDate.getDate();
        this.nextMonthDatesList.push({date,day,overallDate:nextDate});
    }
 }
 onCurrentCustomerChange(){
  console.log(localStorage.getItem("customerToken"));
  if(localStorage.getItem("customerToken")!==null && localStorage.getItem("customerToken")!==""){
      return true;
  }
  else{
    return false;
  }
}
logout(){
  localStorage.setItem("customerToken","");
  this.router.navigateByUrl("/");
}
  
  get2DFormatChanged(){
    if(this.is2DformatSelected){
      let theatreIDList:string[]=[];
      let tempTheatreList:Theatre[]=[];
      this.movie.theatres?.forEach(e=>{
        if(e.format?.includes("2D") && e.name){
            theatreIDList.push(e.name);
        }
      });
      this.theatreList=this.theatreList.filter(e=>{
        if(e.theatreID && theatreIDList.includes(e.theatreID)){
            return e;
        }
        return ;
      })
    }
    else{
      this.getTheatresByMovieID();
    }
  }
  getShowScreen(){

  }
  get3DFormatChanged(){
    if(this.is3DformatSelected){
      let theatreIDList:string[]=[];
      let tempTheatreList:Theatre[]=[];
      this.movie.theatres?.forEach(e=>{
        if(e.format?.includes("3D") && e.name){
            theatreIDList.push(e.name);
        }
      });
      this.theatreList=this.theatreList.filter(e=>{
        if(e.theatreID && theatreIDList.includes(e.theatreID)){
            return e;
        }
        return ;
      })
    }
    else{
      this.getTheatresByMovieID();
    }
  }
  getIMAX3DFormatChanged(){
    if(this.isIMAX3DformatSelected){
      let theatreIDList:string[]=[];
      let tempTheatreList:Theatre[]=[];
      this.movie.theatres?.forEach(e=>{
        if(e.format?.includes("IMAX 3D") && e.name){
            theatreIDList.push(e.name);
        }
      });
      this.theatreList=this.theatreList.filter(e=>{
        if(e.theatreID && theatreIDList.includes(e.theatreID)){
            return e;
        }
        return ;
      })
    }
    else{
      this.getTheatresByMovieID();
    }
  }

  getConcatenatedFormat(format:string|undefined){
    if(format)
    return "is"+format+"formatSelected";
  return;
  }
  goToHome(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("");
  }
  getNewMovie(movieID:string|undefined){
    if(movieID){
      movieID=movieID.substring(1);
      localStorage.setItem("movieID",movieID);
      this.getMovieByID();
      this.getTheatresByMovieID();
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
  getShowScreenList(theatreID:string|undefined){
    let showScreenList:ShowScreen[]=[];
    this.movie.theatres?.forEach(e=>{
      if(e.name===theatreID && e.showtimeList){
        showScreenList=e.showtimeList;
      }
    });
    return showScreenList;
  }
  getTheatresForLanguageFilter(){
   let theatreIDList:string[]=[];
    let languageList:string[]=[];
   this.theatreList.forEach(e=>{
    if(e.theatreID){
      theatreIDList.push(e.theatreID);
    }
   });
   let movieTheatreList:MovieTheatre[]|undefined=this.movie.theatres?.filter(e=>{
    if(e.name){
      return theatreIDList.includes(e.name);
    }
    return;
   });
   if(movieTheatreList){
         movieTheatreList.forEach(e=>{
          if(e.languages){
            e.languages.forEach(item=>{
              if(!languageList.includes(item))
              languageList.push(item);
            })
          }
        })
   }
   return languageList;
  }
  filterTheatresByLanguage(language:string|undefined){
    
    if(language){
      this.theatreList=this.overallTheatreList;
      this.isLanguageFilterChanged=true;
      this.currentLanguageFilter=language;
      let theatreIDList:string[]=[];
      let tempTheatreList:Theatre[]=[];
      this.movie.theatres?.forEach(e=>{
        if(e.languages?.includes(language) && e.name){
            theatreIDList.push(e.name);
        }
      });
      tempTheatreList=this.theatreList.filter(e=>e.theatreID && theatreIDList.includes(e.theatreID));
      if(tempTheatreList.length!=0){
        this.theatreList=tempTheatreList;
      }
    }
  }
  getFormatsByID(){
    let formatList:string[]=[];
    let theatreIDList:string[]=[];
    this.theatreList.forEach(e=>{
      if(e.theatreID)
      theatreIDList.push(e.theatreID)
    })
    this.movie.theatres?.forEach(e=>{
      if( e.name && theatreIDList.includes(e.name)){
        e.format?.forEach(item=>{
          if(!formatList.includes(item))
          formatList.push(item);
        })
      }
    });
    return formatList;
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


}
