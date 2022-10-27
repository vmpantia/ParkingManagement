import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

/* MODELS */
import { Car } from 'src/app/models/car.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerRequest } from 'src/app/models/requests/customer-request.model';

/* SERVICES */
import { ApiService } from 'src/app/services/api.service';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private api:ApiService, private util:UtilityService) { }

  modalTitle:string;

  isNew:boolean = true;
  isCarSubFormShow:boolean = false;

  errorMessages:any[] = [];

  customers:Customer[];
  customerInfo:Customer;
  carInfo:Car = new Car();

  ngOnInit(): void {
    this.getCustomers();
  }

  /**#################### CUSTOMER FUNCTIONS ####################**/
  getCustomers(){
    //Reset errorMessages
    this.errorMessages = [];

    //Get customers from database using API
    this.api.getCustomers().subscribe(
      (res) => {
        this.customers = res;
      }
    )
  }
  
  getCustomerById(id:any) {
    //Get specific customer from database based on the given id using API
    this.api.getCustomerById(id).subscribe(
      (res) => {
        //Store response in custemerInfo
        this.customerInfo = res;
      }
    )
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
    this.api.SaveCustomer(model).subscribe(
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

  addCustomer() {
    //Change modal title to Add Customer
    this.modalTitle = "Add Customer";

    //Set true in isNew to identified that the transaction is Adding a Customer
    this.isNew = true;
    this.isCarSubFormShow = false;

    //Initialize customerInfo
    this.customerInfo = new Customer();

    //Reset errorMessages
    this.errorMessages = [];
  }

  editCustomer(id:any) {
    //Change modal title to Edit Customer
    this.modalTitle = "Edit Customer";

    //Set false in isNew to identified that the transaction is Editing a Customer
    this.isNew = false;

    //Get latest customer information in database using API
    this.getCustomerById(id);

    //Reset errorMessages
    this.errorMessages = [];
  }

  closeCustomerForm(){
    //Initialize customerInfo
    this.customerInfo = new Customer();

    this.isCarSubFormShow = false;
  }

  /**#################### CAR FUNCTIONS ####################**/
  addCarFromSubForm() {
    //Set true in isCarSubFormShow to trigger the display of Car Sub Form
    this.isCarSubFormShow = true;

    //Initialize carInfo
    this.carInfo = new Car();

    //Reset errorMessages
    this.errorMessages = [];
  }
  
  saveCarFromSubForm(){
    //Parse car information
    this.util.parseCar(this.carInfo)

    //Validate customer information
    this.errorMessages = this.util.validateCar(this.carInfo);
    
    //Check if there's an errorMessages coming from the validation
    if(this.errorMessages.length !== 0) {
      return;
    }

    //Push the carInfo in customersInfo.cars 
    this.customerInfo.cars.push(this.carInfo);

    //Close CarSubForm
    this.closeCarSubForm();
  }

  closeCarSubForm() {
    //Set false in isCarSubFormShow to trigger the close of Car Sub Form
    this.isCarSubFormShow = false;

    //Initialize carInfo
    this.carInfo = new Car();
  }
}
