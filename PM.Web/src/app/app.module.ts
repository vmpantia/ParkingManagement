import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { ShowCustomerComponent } from './customer/show-customer/show-customer.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ShowCustomerComponent,
    AddEditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
