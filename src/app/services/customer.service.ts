import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url:string="http://localhost:3333/customer"
  constructor(private httpClient:HttpClient) { }
  getCustomer(token:string){
    return this.httpClient.get<Customer>(this.url+"/getCustomerByID",{headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+token
    })})
  }
  addOrder(order:Order,token:string){
    return this.httpClient.post<Order>(this.url+"/addOrder",order,{headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+token
    })});
  }
  addCustomer(customer:Customer){
      return this.httpClient.post<Customer>(this.url+"/addCustomer",customer);
  }
}
