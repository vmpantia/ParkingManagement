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

  getCustomers(filter:any):Observable<Customer[]> {
    return this.http.post<any>(Globals.URL + '/Customer/GetCustomers',filter);
  }

  getCustomerById(id:any):Observable<Customer> {
    return this.http.get<any>(Globals.URL + '/Customer/GetCustomerById/' + id);
  }

  saveCustomer(model:any) {
    return this.http.post(Globals.URL + '/Customer/SaveCustomer', model);
  }
}
