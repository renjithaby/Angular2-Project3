/**
 * Created by rabby on 01/03/17.
 */
export class ExpenseItem{
    date : string;
    category : string;
    value : number;

    constructor(date : string, category: string,value :number){
        this.date = date;
        this.category = category;
        this.value = value;
    }
}