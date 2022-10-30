import { Globals } from "src/app/common/globals.model";

export class FilterSetting {
    public value:string = Globals.EMPTY_STRING;
    public pageSize:number = Globals.DEFAULT_PAGE_SIZE;
    public pageNo:number = Globals.DEFAULT_PAGE_NO;
    public dateFrom:Date
    public dateTo:Date
}
