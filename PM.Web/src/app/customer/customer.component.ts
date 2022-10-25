import { Component, OnInit } from '@angular/core';
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

  customers:any[];
  customerInfo:any;

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

  addCustomer() {
    this.modalTitle = "Add Customer";
    this.isNew = true;
    this.customerInfo = [];
  }
}
