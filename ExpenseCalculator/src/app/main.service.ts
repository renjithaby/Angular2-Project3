import { Injectable } from '@angular/core';
import {ExpenseItem} from './expense.item';
@Injectable()
export class MainService {
  private expenseCategories:Object[];
  private expenseSummary:Object[] = [];
  private expenseData: ExpenseItem[] = [];
  private selectedDateData: ExpenseItem[] = [];
  private num:Object[] = [{mynum:1}];
  constructor() {

      this.initailise();
  }
    expenseCategories = [
    {
        id :1,
        name: "food"
    },
    {
        id :2,
        name: "petrol"
    },
    {
        id :3,
        name: "travel"
    },
    {
        id :4,
        name: "clothes"
    }
];



    initailise() {
        for (let i = 0; i < this.expenseCategories.length; i++) {
            this.expenseSummary.push({category: this.expenseCategories[i].name, value: 0});
        }
    }

    getTotalNum():Object[] {

        return this.num;
    }

    getExpenseData():ExpenseItem[]{
        return this.expenseData;
    }
    getExpenseCategories():Object[]{
        return this.expenseCategories;
    }
    addToExpenseData(item:ExpenseItem){
        this.expenseData.push(item);
        this.num[0].mynum +=1;
    }

    removeFromExpenseData(item:ExpenseItem){
        let index =  this.expenseData.indexOf(item);
        this.expenseData.splice(index,1);
    }

    getSelectedDateData(selectedDate: string): ExpenseItem[]{
        this.selectedDateData = [];
        for (let i =0; i<this.expenseData.length; i++){
            if(this.expenseData[i].date === selectedDate ){
                this.selectedDateData.push(this.expenseData[i]);
            }
        }
        return this.selectedDateData;
    }

    getExpenseSummary(type:string):Object[]{
        for(let j =0 ; j< this.expenseSummary.length; j++) {
            this.expenseSummary[j].value = 0;
            for (let i = 0; i < this.expenseData.length; i++) {

                if (this.expenseData[i].category === this.expenseSummary[j].category) {
                    this.expenseSummary[j].value += Number(this.expenseData[i].value);
                }
            }
        }
        return this.expenseSummary;
    }

}
