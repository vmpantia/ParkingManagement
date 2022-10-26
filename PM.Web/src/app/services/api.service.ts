import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly URL = "https://localhost:7220/api"
  constructor(private http:HttpClient) { }

  getCustomers():Observable<Customer[]> {
    return this.http.get<any>(this.URL + '/Customer/GetCustomers');
  }

  getCustomerById(id:any):Observable<Customer> {
    return this.http.get<any>(this.URL + '/Customer/GetCustomerById?customerId=' + id);
  }

  SaveCustomer(val:any) {
    return this.http.post(this.URL + '/Customer/SaveCustomer', val);
  }
}
