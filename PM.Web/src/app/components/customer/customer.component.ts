import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { Globals } from 'src/app/common/globals.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerRequest } from 'src/app/models/requests/customer-request.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private api:ApiService) { }

  modalTitle:string;

  isNew:boolean = true;
  hasError:boolean = false;

  customers:Customer[];
  customerInfo:Customer;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.api.getCustomers().subscribe(
      (res) => {
        this.customers = res;
      },
      (err) => {
        this.hasError = true;
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
    let model = new CustomerRequest();
    model.customerData = this.customerInfo;

    console.log(model);
    
    this.api.SaveCustomer(model).subscribe(
      (res) => {
        window.location.reload();
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

}
