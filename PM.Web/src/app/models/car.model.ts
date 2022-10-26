import { Globals } from "../common/globals.model";

export class Car {
    public carId:any = Globals.EMPTY_GUID;
    public customerId:any = Globals.EMPTY_GUID;
    public plateNo:string = Globals.EMPTY_STRING;
    public type:string = Globals.EMPTY_STRING;
    public yearModel:string = Globals.EMPTY_STRING;
    public make:string = Globals.EMPTY_STRING;
    public color:string = Globals.EMPTY_STRING;
    public status:number = 0;
    public createdDate:Date;
    public modifiedDate:Date;
}
