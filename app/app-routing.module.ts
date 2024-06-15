import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieviewComponent } from './movieview/movieview.component';
import { CityComponent } from './city/city.component';
import { LoginComponent } from './login/login.component';
import { SeatviewComponent } from './seatview/seatview.component';
import { OrdercustomerviewComponent } from './ordercustomerview/ordercustomerview.component';
import { RegisterComponent } from './register/register.component';
import { TheatreViewComponent } from './theatre-view/theatre-view.component';
import { TheatreOwnerHomeComponent } from './theatre-owner-home/theatre-owner-home.component';
import { TheatreLoginComponent } from './theatre-login/theatre-login.component';
import { LoginGuard } from './login-guard';
import { TheatreloginGuard } from './theatrelogin-guard';

const routes: Routes = [{path:"",component:HomeComponent},
  {path:"movieView/:movieID",component:MovieviewComponent},
  {path:"cityView",component:CityComponent},
  {path:"loginView",component:LoginComponent},
  {path:"registerView",component:RegisterComponent},
  {path:"seatView/:theatreID",component:SeatviewComponent,canActivate:[LoginGuard]},
  {path:"orderview",component:OrdercustomerviewComponent,canActivate:[LoginGuard]},
  {path:"theatreview/:theatreID",component:TheatreViewComponent},
  {path:"theatreownerhome",component:TheatreOwnerHomeComponent,canActivate:[TheatreloginGuard]},
  {path:"theatrelogin",component:TheatreLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
