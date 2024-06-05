import { Component } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  cities:string[]=["Mumbai","Delhi-NCR","Bengaluru","Hyderabad","Chennai","Pune","Kolkata","Ahmedabad"]
}
