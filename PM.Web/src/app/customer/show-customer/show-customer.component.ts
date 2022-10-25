import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent implements OnInit {

  constructor(private api:ApiService) { }

  customers:any[];
  error_messages:any;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.api.getCustomers().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        this.error_messages = error;
      }
    )
  }
}
