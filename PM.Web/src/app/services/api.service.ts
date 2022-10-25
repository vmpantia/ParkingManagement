import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly URL = "https://localhost:7220/api"
  constructor(private http:HttpClient) { }

  getCustomers():Observable<any[]> {
    return this.http.get<any>(this.URL + '/Customer/GetCustomers');
  }

  getCustomerById(customerId:any):Observable<any> {
    return this.http.get<any>(this.URL + '/Customer/GetCustomerById?customerId=' + customerId);
  }

  SaveCustomer(customer:any) {
    return this.http.post(this.URL + '/Customer/SaveCustomer', customer);
  }
}
