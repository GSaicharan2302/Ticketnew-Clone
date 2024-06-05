import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { Theatre } from '../model/theatre';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  moviesURL:string="http://localhost:3333/movieControl";
  constructor(private httpClient:HttpClient) { }
  getMoviesByCity(city:string){
      return this.httpClient.get<Movie[]>(this.moviesURL+"/getMoviesByCity/"+city);
  }
  getMoviesByCityAndLanguage(city:string,language:string){
    return this.httpClient.get<Movie[]>(this.moviesURL+"/getMoviesByCityAndLanguages/"+city+"/"+language);
  }
  getMoviesByCityAndGenre(city:string,genre:string){
    return this.httpClient.get<Movie[]>(this.moviesURL+"/getMoviesByCityAndGenre/"+city+"/"+genre);
  }
  getMoviesByCityAndFormat(city:string,format:string){
    return this.httpClient.get<Movie[]>(this.moviesURL+"/getMoviesByCityAndFormat/"+city+"/"+format);
  }
  getMoviesByCityAndUpcoming(city:string){
    return this.httpClient.get<Movie[]>(this.moviesURL+"/getMoviesByCityAndUpcoming/"+city);
  }
  getMovieByID(movieID:string){
    return this.httpClient.get<Movie>(this.moviesURL+"/getMovieByID/"+movieID);
  }
  getTheatresByMovieID(movieID:string,city:string){
    return this.httpClient.get<Theatre[]>(this.moviesURL+"/getTheatresByMovieID/"+movieID+"/"+city);
  }
  getAmount(obj:any,theatreID:string,movieID:string,format:string){
    return this.httpClient.post<number>(this.moviesURL+"/getAmount/"+theatreID+"/"+movieID+"/"+format,obj);
  }
}
