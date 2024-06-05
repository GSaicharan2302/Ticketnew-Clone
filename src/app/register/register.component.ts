import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginData } from '../model/login-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  customer:Customer={};
customerForm:FormGroup=new FormGroup({
  emailID:new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)]),
  customername:new FormControl('',[Validators.required]),
  contactno:new FormControl('',[Validators.required])
});
  get emailID(){
    return this.customerForm.get('emailID');
  }
  get customername(){
    return this.customerForm.get('customername');
  }
  get contactno(){
    return this.customerForm.get('contactno');
  }
  constructor(private customerService:CustomerService,private router:Router,private authService:AuthService){}
  customerFormOnSubmit(event:Event){
    event.preventDefault();
    console.log(this.customerForm.value);
    this.customer=this.customerForm.value as Customer;
    this.customer.contactno=parseInt(this.customerForm.get('contactno')?.value);
    console.log(this.customer);
    this.customerService.addCustomer(this.customer).subscribe(
      success=>{
          console.log(success);
          if(success.emailID)
          this.authService.getOTP(success.emailID).subscribe(
        success=>{
            let loginData:LoginData={};
            let temp:number=success as number;
            loginData.emailID=this.customer.emailID;
            loginData.otp=temp;
            this.authService.login(loginData).subscribe(
              success=>{
                if(success.token)
                  localStorage.setItem("customerToken",success.token);
                  this.router.navigateByUrl("");
              },
              failure=>{

              }
            )
        },
      failure=>{

      })          
      },
      failure=>{
          console.log(failure);
      }
    )
  }
}
