import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
const routes: Routes = [
  {path: 'customer', component:CustomerComponent},
  {path: 'car', component:CarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
