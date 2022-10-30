import { Component, Input, OnInit } from '@angular/core';
import swal from 'sweetalert2';

/* MODELS */
import { Customer } from 'src/app/models/customer.model';
import { CustomerRequest } from 'src/app/models/requests/customer-request.model';

/* SERVICES */
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Car } from 'src/app/models/car.model';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {

  constructor(private api:ApiService, private util:UtilityService) { }
  
  errorMessages:any[] = [];
  showCarSubForm:boolean =false;

  @Input()customerInfo:Customer;
  newCustomerInfo:Customer = new Customer();
  customerCarInfo:Car;

  ngOnInit(): void {
    this.newCustomerInfo = this.customerInfo;
  }

  saveCustomer() {
    //Parse customer information
    this.util.parseCustomer(this.customerInfo);

    //Validate customer information
    this.errorMessages = this.util.validateCustomer(this.customerInfo);

    //Check if there's an errorMessages coming from the validation
    if(this.errorMessages.length !== 0) {
      return;
    }

    //Initialize CustomerRequest model
    let model = new CustomerRequest();
    //Store customer information to request model
    model.customerData = this.customerInfo;

    //Save customer information in database using API
    this.api.saveCustomer(model).subscribe(
      (res) => {
        swal.fire("Success","Customer saved successfully", "success")
        .then(() => {
          //If success reload page
          window.location.reload();
        })
      },
      (err:HttpErrorResponse) => {
        //If error store the error in errorMessages
        if(err.error?.length !== 0) {
          this.errorMessages.push(err.error);
          return;
        }
        this.errorMessages.push(err.error.title);
      }
    );
  }

   /**#################### CAR FUNCTIONS ####################**/
  addCustomerCar() {
    this.showCarSubForm = true;
    this.resetVariables();
  }

  closeCarSubForm() {
    this.showCarSubForm = false;
    this.resetVariables();
  }

  saveCustomerCar(){
    //Parse car information
    this.util.parseCar(this.customerCarInfo)

    //Validate customer information
    this.errorMessages = this.util.validateCar(this.customerCarInfo);
    
    //Check if there's an errorMessages coming from the validation
    if(this.errorMessages.length !== 0) {
      return;
    }

    //Push the carInfo in customersInfo.cars 
    this.newCustomerInfo.cars.push(this.customerCarInfo);

    this.closeCarSubForm();
  }

  resetVariables(){
    //Initialize carInfo
    this.customerCarInfo = new Car();

    //Reset errorMessages
    this.errorMessages = [];
  }
}
