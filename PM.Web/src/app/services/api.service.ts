import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Globals } from '../common/globals.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getCustomers():Observable<Customer[]> {
    return this.http.get<any>(Globals.URL + '/Customer/GetCustomers');
  }

  getCustomerById(id:any):Observable<Customer> {
    return this.http.get<any>(Globals.URL + '/Customer/GetCustomerById?customerId=' + id);
  }

  SaveCustomer(model:any) {
    return this.http.post(Globals.URL + '/Customer/SaveCustomer', model);
  }
}
