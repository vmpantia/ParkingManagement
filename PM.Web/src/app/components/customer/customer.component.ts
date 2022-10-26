import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/common/globals.model';
import { Customer } from 'src/app/models/customer.model';
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
      },
      (err) => {
        this.hasError = true;
      }
    )
  }

  addCustomer() {
    this.modalTitle = "Add Customer";
    this.isNew = true;
    this.customerInfo = new Customer();
    console.log(this.customerInfo);
  }

  editCustomer(id:any) {
    this.modalTitle = "Edit Customer";
    this.isNew = false;
    this.getCustomerById(id);
    console.log(this.customerInfo);
  }

  closeCustomerForm(){
    window.location.reload();
  }

}
