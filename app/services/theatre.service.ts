import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theatre } from '../model/theatre';
import { TheatreOrder } from '../model/theatre-order';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  url:string="http://localhost:3333/theatre";
  constructor(private httpClient:HttpClient) { }
  getTheatresByCity(city:string){
    return this.httpClient.get<Theatre[]>(this.url+"/getTheatresByCity/"+city);
  }
  getSeatsByDateAndShowtimeAndScreen(theatreID:string,obj:any){
    return this.httpClient.post<string[]>(this.url+"/getSeatsByDateAndShowtimeAndScreen/"+theatreID,obj);
  }
  getTheatreByID(id:string){
    return this.httpClient.get<Theatre>(this.url+"/getTheatreByID/"+id);
  }
}
