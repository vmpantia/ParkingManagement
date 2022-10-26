import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { Globals } from 'src/app/common/globals.model';
import { Car } from 'src/app/models/car.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerRequest } from 'src/app/models/requests/customer-request.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private api:ApiService, private util:UtilityService) { }

  modalTitle:string;

  isNew:boolean = true;
  isCarSubFormShow:boolean = false;

  errorMessages:any[] = [];

  customers:Customer[];
  customerInfo:Customer;
  carInfo:Car = new Car();

  ngOnInit(): void {
    this.getCustomers();
  }

  //Customer Functions
  getCustomers(){
    this.errorMessages = [];
    this.api.getCustomers().subscribe(
      (res) => {
        this.customers = res;
      }
    )
  }
  
  getCustomerById(id:any) {
    this.api.getCustomerById(id).subscribe(
      (res) => {
        this.customerInfo = res;
      }
    )
  }
  
  saveCustomer() {
    this.util.parseCustomer(this.customerInfo);
    this.errorMessages = this.util.validateCustomer(this.customerInfo);
    console.log(this.errorMessages);
    if(this.errorMessages.length !== 0)
    {
      return;
    }

    let model = new CustomerRequest();
    model.customerData = this.customerInfo;

    this.api.SaveCustomer(model).subscribe(
      (res) => {
        window.location.reload();
      },
      (err:HttpErrorResponse) => {
        this.errorMessages.push(err.error.title);
      }
    );
  }

  addCustomer() {
    this.modalTitle = "Add Customer";
    this.isNew = true;
    this.customerInfo = new Customer();
  }

  editCustomer(id:any) {
    this.modalTitle = "Edit Customer";
    this.isNew = false;
    this.getCustomerById(id);
  }

  closeCustomerForm(){
    this.customerInfo = new Customer();
  }

  //Car Functions
  addCarFromSubForm() {
    this.isCarSubFormShow = true;
    this.carInfo = new Car();
  }
  
  saveCarFromSubForm(){
    this.util.parseCar(this.carInfo)
    this.customerInfo.cars.push(this.carInfo);
    console.log(this.customerInfo);
    this.closeCarSubForm();
  }

  closeCarSubForm() {
    this.isCarSubFormShow = false;
    this.carInfo = new Car();
  }
}
