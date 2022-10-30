import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

/* MODELS */
import { Car } from 'src/app/models/car.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerRequest } from 'src/app/models/requests/customer-request.model';
import { FilterSetting } from 'src/app/models/requests/filtersetting.model';

/* SERVICES */
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private api:ApiService) { }

  modalTitle:string;
  errorMessages:any[] = [];

  customers:Customer[];
  customerInfo:Customer;
  filterSetting:FilterSetting = new FilterSetting();

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    //Reset errorMessages
    this.errorMessages = [];

    //Get customers from database using API
    this.api.getCustomers(this.filterSetting).subscribe(
      (res) => {
        this.customers = res;
      },
      (err:HttpErrorResponse) => {
        //If error store the error in errorMessages
        if(err.error?.length !== 0) {
          this.errorMessages.push(err.error);
          return;
        }
        this.errorMessages.push(err.error.title);
      }
    )
  }
  
  getCustomerById(id:any) {
    //Get specific customer from database based on the given id using API
    this.api.getCustomerById(id).subscribe(
      (res) => {
        //Store response in custemerInfo
        this.customerInfo = res;
      }
    )
  }

  addCustomer() {
    //Change modal title to Add Customer
    this.modalTitle = "Add Customer";

    this.resetVariables();
  }

  editCustomer(id:any) {
    //Change modal title to Edit Customer
    this.modalTitle = "Edit Customer";
    
    //Reset errorMessages
    this.errorMessages = [];

    //Get latest customer information in database using API
    this.getCustomerById(id);
  }

  closeCustomerForm(){
    this.resetVariables();

    //Reload page
    window.location.reload();
  }

  resetVariables(){
    //Initialize carInfo
    this.customerInfo = new Customer();

    //Reset errorMessages
    this.errorMessages = [];
  }
}
