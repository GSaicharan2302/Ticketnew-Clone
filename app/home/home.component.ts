import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CityComponent } from '../city/city.component';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';
import { LoginComponent } from '../login/login.component';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import { Theatre } from '../model/theatre';
import { TheatreService } from '../services/theatre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchResult:string="";
  currentCity:string="";
  movieList:Movie[]=[];
  currentLanguage:string="";
  currentFormat:string="";
  isActionGenre:boolean=false;
  isAdventureGenre:boolean=false;
  mySet: Set<string> = new Set<string>();
  currentCustomer?:Customer={};
  isLoginBtnView:boolean=false;
  isShowTheatreList:boolean=false;
  isShowMovieList:boolean=false;
  cityTheatreList:Theatre[]=[];
  movies:Movie[]=[];
  constructor(private router:Router,private dialog:MatDialog,private movieService:MovieService,private customerService:CustomerService,private theatreService:TheatreService){
        let dialogRef=this.dialog.open(CityComponent,{
          width:'1040px',
          height:'270px'
        });
        dialogRef.afterClosed().subscribe(
          result=>{
            console.log(result);
            this.currentCity=result;
            localStorage.setItem("city",this.currentCity);
            this.movieService.getMoviesByCity(this.currentCity).subscribe(
              success=>{
                this.movieList=success;
                console.log(this.movieList);
              },
              failure=>{
                console.log(failure);
              }
            )
          }
        )
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
        this.getTheatresByCity();
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
  }
  onLogin(){
    let dialogRef=this.dialog.open(LoginComponent,{
      width:'1040px',
      height:'330px'
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        console.log(result);
        let token:string|null=localStorage.getItem("customerToken");
        console.log("Token is : "+token);
        if(token!==null){
              this.customerService.getCustomer(token).subscribe(
                success=>{
                  this.currentCustomer=success;
                  console.log(this.currentCustomer);
                },
                failure=>{
                  console.log(failure);
                }
              )     
        }
      }
    )
  }
  
  onLocationClick(event:Event){
    event.preventDefault();
    let dialogRef=this.dialog.open(CityComponent,{
      width:'1040px',
      height:'270px'
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        this.currentCity=result;
        localStorage.setItem("city",this.currentCity);
        this.movieService.getMoviesByCity(this.currentCity).subscribe(
          success=>{
              this.movieList=success;
              
          },
          failure=>{
              console.log(failure);
          }
        )
      }
    )
  }
  onLanguageFilterChange(){
    if(this.currentLanguage.toLowerCase()!=="all"){
    this.movieService.getMoviesByCityAndLanguage(this.currentCity,this.currentLanguage).subscribe(
      success=>{
          this.movieList=success;
      },
      failure=>{
        console.log(failure);
      }
    )
  }
  else{
      this.movieService.getMoviesByCity(this.currentCity).subscribe(
        success=>{
          this.movieList=success;
        },
        failure=>{
          console.log(failure);
        }
      )
  }
}

  onChangeToActionGenre(){
    if(this.isActionGenre===true){
    this.movieService.getMoviesByCityAndGenre(this.currentCity,"Action").subscribe(
      success=>{
          this.movieList=success;
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  else{
    this.movieService.getMoviesByCity(this.currentCity).subscribe(
      success=>{
        this.movieList=success;
        console.log(this.movieList);
      },
      failure=>{
        console.log(failure);
      }
    )
  }
  }
  onChangeToAdventureGenre(){
    if(this.isAdventureGenre===true){
    this.movieService.getMoviesByCityAndGenre(this.currentCity,"Adventure").subscribe(
      success=>{
          this.movieList=success;
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  else{
    this.movieService.getMoviesByCity(this.currentCity).subscribe(
      success=>{
        this.movieList=success;
        console.log(this.movieList);
      },
      failure=>{
        console.log(failure);
      }
    )
  }
  }
  getLanguagesByMovieID(movieID:string|undefined){
    if(movieID){
      let movie:Movie=this.movieList.filter(e=>e.movieID===movieID)[0];
      let movieArr:Set<string>=new Set<string>();
      movie.theatres?.forEach(e=>{
        e.languages?.forEach(item=>{
          movieArr.add(item);
        })
      });
      console.log(movieArr.toString());
      let myArray = Array.from( movieArr );
      return myArray.toString();
    }
    return ;
  }
  onFormatChange(){
    if(this.currentFormat!=="All"){
    this.movieService.getMoviesByCityAndFormat(this.currentCity,this.currentFormat).subscribe(
      success=>{
          this.movieList=success;
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  else{
    this.movieService.getMoviesByCity(this.currentCity).subscribe(
      success=>{
          this.movieList=success;
      },
      failure=>{
        console.log(failure);
      }
    )
  }
  }
  searchMovies(){
    let tempMovieList:Movie[]=[];
    if(this.searchResult!=""){
      tempMovieList=this.movieList.filter(e=>e.movieName?.toLowerCase().startsWith(this.searchResult.toLowerCase()));
      if(tempMovieList.length!=0){
        this.movieList=tempMovieList;
      }
    }
    else{
      this.movieService.getMoviesByCity(this.currentCity).subscribe(
        success=>{
            this.movieList=success;
        },
        failure=>{
          console.log(failure);
        }
      )
    }
  }
  getUpcomingMovies(event:Event){
    event.preventDefault();
    this.movieService.getMoviesByCityAndUpcoming(this.currentCity).subscribe(
      success=>{
          this.movieList=success;
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  getCurrentMovies(event:Event){
    event.preventDefault();
    this.movieService.getMoviesByCity(this.currentCity).subscribe(
      success=>{
          this.movieList=success;
      },
      failure=>{
          console.log(failure);
      }
    )
  }
  onMovieCardClick(movieID:string|undefined){
    if(movieID){
      let id:string=movieID.substring(1);
    this.router.navigateByUrl("/movieView/"+id);
    }
  }
  showTheatreList(){
    this.isShowTheatreList=true;
    this.isShowMovieList=false;
  }
  hideTheatreList(){
    this.isShowTheatreList=false;
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
  navigateToTheatreView(theatreID:string|undefined){
    if(theatreID){
      this.router.navigateByUrl("/theatreview/"+theatreID);
    }
}
showMovieList(){
  this.isShowMovieList=true;
  this.isShowTheatreList=false;
}
hideMovieList(){
  this.isShowMovieList=false;
}
getNewMovie(movieID:string|undefined){
  if(movieID){
    movieID=movieID.substring(1);
    localStorage.setItem("movieID",movieID);
    this.router.navigateByUrl("/movieView/"+movieID);
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
goToOrders(event:Event){
  event.preventDefault();
  this.router.navigateByUrl("/orderview");
}
}
