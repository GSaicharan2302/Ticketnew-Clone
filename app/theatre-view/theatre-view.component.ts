import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { TheatreService } from '../services/theatre.service';
import { Theatre } from '../model/theatre';
import { Customer } from '../model/customer';
import { Movie } from '../model/movie';
import { MovieTheatre } from '../model/movie-theatre';
import { ShowScreen } from '../model/show-screen';
import { every, filter } from 'rxjs';

@Component({
  selector: 'app-theatre-view',
  templateUrl: './theatre-view.component.html',
  styleUrls: ['./theatre-view.component.css'],
  providers:[DatePipe]
})
export class TheatreViewComponent {
filterMoviesByLanguage(language: string) {
  this.isLanguageFilterChanged=true;
  this.currentLanguageFilter=language;
    let movieIDList:string[]=[];
    this.currentMovies=this.finalCurrentMovies;
    this.currentMovies.forEach(e=>{
      e.theatres?.forEach(item=>{
          if(item.name?.substring(1)===this.currentTheatreID && item.languages?.includes(language) && e.movieID){
                movieIDList.push(e.movieID);
          }
      })
    });
    this.currentMovies=this.currentMovies.filter((e)=>{
      return e.movieID && movieIDList.includes(e.movieID);
    })
}
  goToHome(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("");
  }
  goToOrders(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/orderview");
  // throw new Error('Method not implemented.');
  }
  getMonth(date:Date){
    let months:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[date.getMonth()];
  }
  getNextMonth(month:number){
    let months:string[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[month];
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
    currentMovies:Movie[]=[];
    currentTheatreID:string="";
    finalCurrentMovies:Movie[]=[];
    currentTheatre:Theatre={};
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private movieService:MovieService,private datePipe:DatePipe,private customerService:CustomerService,private theatreService:TheatreService){
    this.activatedRoute.paramMap.subscribe(
      data=>{
        let str:string=data.get('theatreID')??"";
        this.currentTheatreID=str;
        console.log(str);
        this.getDatesForAWeekThisMonth();
        // localStorage.setItem("movieID",str);
        this.getMoviesByCity();
        this.getTheatresByCity();
        this.getTheatreByID();
        // this.getMovieByID();
        // this.getTheatresByMovieID();
        this.getCurrentMoviesByTheatreID(str);
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
showMovieList(){
  this.isShowMovieList=true;
  this.isShowTheatreList=false;
}
hideMovieList(){
  this.isShowMovieList=false;
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
  getCurrentMoviesByTheatreID(theatreID:string){
    this.movieService.getMoviesByTheatreID(theatreID).subscribe(
      success=>{
        this.currentMovies=success;
        this.finalCurrentMovies=this.currentMovies;
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  getCurrentMovieLanguage(movieID:string|undefined){
    let tempCurrentlanguages:string[]=[];
    let resultLanguage:string="";
    this.currentMovies.forEach(e=>{
      console.log(e.movieID);
      console.log(movieID);
      if(e.movieID===movieID){
        e.theatres?.forEach(item=>{
          if(item.name?.substring(1)===this.currentTheatreID && item.languages){
            console.log(item.languages);
            tempCurrentlanguages=item.languages;
          }
        });
      }
    });
      for(let i=0;i<tempCurrentlanguages.length;i++){
          if(i==tempCurrentlanguages.length-1){
            resultLanguage+=tempCurrentlanguages[i];
          }
          else{
            resultLanguage+=tempCurrentlanguages[i]+",";
          }
      }
      console.log(resultLanguage);
      return resultLanguage;
    
  }
  getShowTimesOfTheatre(movieID:string|undefined){
    let showScreenList:ShowScreen[]=[];
      this.currentMovies.forEach(e=>{
        if(e.movieID===movieID){
          e.theatres?.forEach(item=>{
            if(item.name?.substring(1)===this.currentTheatreID && item.showtimeList){
                showScreenList=item.showtimeList;
            }
          })
        }
      });
      return showScreenList;
  }
  getLanguagesFilter(){
      let languages:string[]=[];
      this.finalCurrentMovies.forEach(e=>{
        e.theatres?.forEach(item=>{
          if(item.name?.substring(1)===this.currentTheatreID){
              item.languages?.forEach(every=>{
                if(!languages.includes(every)){
                  languages.push(every);
                }
              });
          }
        })
      });

      return languages;
  }
  getTheatreByID(){
    this.theatreService.getTheatreByID(this.currentTheatreID).subscribe(
        success=>{
            this.currentTheatre=success;
        },
        failure=>{
            console.log(failure);
        }
    )
  }
  getMoviesOn2DFormat(){
    let movieIDList:string[]=[];
    this.currentMovies=this.finalCurrentMovies;
    if(this.is2DformatSelected){
    this.finalCurrentMovies.forEach(e=>{
        e.theatres?.forEach(item=>{
            if(item.name?.substring(1)===this.currentTheatreID && item.format?.includes("2D") && e.movieID){
              movieIDList.push(e.movieID);
            }
        });
    });
    this.currentMovies=this.currentMovies.filter((e)=>{
      return e.movieID && movieIDList.includes(e.movieID);
    })}
    else{
      this.currentMovies=this.finalCurrentMovies;
    }
  }
  getMoviesOn3DFormat(){
    let movieIDList:string[]=[];
    this.currentMovies=this.finalCurrentMovies;
    if(this.is3DformatSelected){
    this.finalCurrentMovies.forEach(e=>{
        e.theatres?.forEach(item=>{
            if(item.name?.substring(1)===this.currentTheatreID && item.format?.includes("3D") && e.movieID){
              movieIDList.push(e.movieID);
            }
        });
    });
    this.currentMovies=this.currentMovies.filter((e)=>{
      return e.movieID && movieIDList.includes(e.movieID);
    })
  }
  else{
    this.currentMovies=this.finalCurrentMovies;
  }
  }
  getMoviesOnIMAXFormat(){
    let movieIDList:string[]=[];
    this.currentMovies=this.finalCurrentMovies;
    if(this.isIMAX3DformatSelected){
    this.finalCurrentMovies.forEach(e=>{
        e.theatres?.forEach(item=>{
            if(item.name?.substring(1)===this.currentTheatreID && item.format?.includes("IMAX 3D") && e.movieID){
              movieIDList.push(e.movieID);
            }
        });
    });
    this.currentMovies=this.currentMovies.filter((e)=>{
      return e.movieID && movieIDList.includes(e.movieID);
    })}
    else{
      this.currentMovies=this.finalCurrentMovies;
    }
  }
  getMovieFormatFilters(){
    let formatFilters:string[]=[];
    this.finalCurrentMovies.forEach(e=>{
        e.theatres?.forEach(item=>{
              if(item.name?.substring(1)===this.currentTheatreID){
                item.format?.forEach(every=>{
                    if(!formatFilters.includes(every)){
                        formatFilters.push(every);
                    }      
                })
              }
        });
    });
    return formatFilters;
  }
  getSeatLayout(showScreen:ShowScreen,movieID:string|undefined){
    if(showScreen.showTime && showScreen.screen){
      localStorage.setItem("showTime",showScreen.showTime);
      localStorage.setItem("screen",showScreen.screen);
      if(movieID){
        localStorage.setItem("movieID",movieID.substring(1));
        console.log("Movie ID in getSeatLayout() method "+localStorage.getItem("movieID"));
      }
      this.router.navigateByUrl("/seatView/"+this.currentTheatreID);
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
navigateToTheatreView(theatreID:string|undefined){
  if(theatreID){
    this.getCurrentMoviesByTheatreID(theatreID);
    this.currentTheatreID=theatreID;
    this.isLanguageFilterChanged=false;
    this.getTheatreByID();
  }
}
}
