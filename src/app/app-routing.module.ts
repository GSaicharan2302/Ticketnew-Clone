import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieviewComponent } from './movieview/movieview.component';
import { CityComponent } from './city/city.component';
import { LoginComponent } from './login/login.component';
import { SeatviewComponent } from './seatview/seatview.component';
import { OrdercustomerviewComponent } from './ordercustomerview/ordercustomerview.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{path:"",component:HomeComponent},
  {path:"movieView/:movieID",component:MovieviewComponent},
  {path:"cityView",component:CityComponent},
  {path:"loginView",component:LoginComponent},
  {path:"registerView",component:RegisterComponent},
  {path:"seatView/:theatreID",component:SeatviewComponent},
  {path:"orderview",component:OrdercustomerviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
