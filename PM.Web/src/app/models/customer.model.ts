import { concat } from "rxjs";
import { Globals } from "../common/globals.model";
import { Car } from "./car.model";

export class Customer {
    public customerId:any = Globals.EMPTY_GUID;
    public firstName:string = Globals.EMPTY_STRING;
    public lastName:string = Globals.EMPTY_STRING;
    public middleName:string = Globals.EMPTY_STRING;
    public contactNo:string = Globals.EMPTY_STRING;
    public address:string = Globals.EMPTY_STRING;
    public status:number = 0;
    public createdDate:Date;
    public modifiedDate:Date;
    public cars:Car[] = [];
}
