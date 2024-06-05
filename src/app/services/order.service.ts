import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentURL:string="http://localhost:3333/customer"
  constructor(private httpClient:HttpClient) { }
  getOrdersByCustomerID(customerID:string){
      return this.httpClient.get<Order[]>(this.currentURL+"/getOrdersByCustomerID/"+customerID);
  }
}
