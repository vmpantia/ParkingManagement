import { getNgModuleById, Injectable } from '@angular/core';
import { Globals } from '../common/globals.model';
import { Car } from '../models/car.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  parseCustomer(customer:Customer) {

    customer.firstName = customer.firstName.trim().toUpperCase();
    customer.lastName = customer.lastName.trim().toUpperCase();
    customer.middleName = customer.middleName.trim().toUpperCase();
    customer.contactNo = customer.contactNo.trim().toUpperCase();
    customer.address = customer.address.trim().toUpperCase();

    if(customer.cars.length !== 0)
    {
      customer.cars.forEach(car => {
        this.parseCar(car);
      })
    }

  }

  parseCar(car:Car) {
    car.plateNo = car.plateNo.trim().toUpperCase();
    car.type = car.type.trim().toUpperCase();
    car.yearModel = car.yearModel.trim().toUpperCase();
    car.make = car.make.trim().toUpperCase();
    car.color = car.color.trim().toUpperCase();
  }

  validateCustomer(newCustomer:Customer) {
    let errorMessages:any = [];

    if(newCustomer.firstName === Globals.EMPTY_STRING) {
      errorMessages.push("The First Name field is required.")
    }
    if(newCustomer.lastName === Globals.EMPTY_STRING) {
      errorMessages.push("The Last Name field is required.")
    }
    if(newCustomer.contactNo === Globals.EMPTY_STRING) {
      errorMessages.push("The Contact Number field is required.")
    }
    if(newCustomer.address === Globals.EMPTY_STRING) {
      errorMessages.push("The Address field is required.")
    }

    return errorMessages;
  }
}
