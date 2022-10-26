import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {

  constructor(private api:ApiService) { }
  
  @Input()customerInfo:Customer;
  newCustomerInfo:Customer = new Customer();
  hasError:boolean = false;

  ngOnInit(): void {    
    this.newCustomerInfo = this.customerInfo;
  }
}
