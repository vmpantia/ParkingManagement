import { Globals } from "src/app/common/globals.model";
import { Customer } from "../customer.model";

export class CustomerRequest {
    public userId:any = Globals.EMPTY_GUID;
    public customerData:Customer = new Customer();
}
