import { Injectable } from '@angular/core';
import {ExpenseItem} from './expense.item';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {
  private expenseCategories:Object[];
  private expenseSummary:Object[] = [];
  private expenseData: ExpenseItem[] = [];
  private selectedDateData: ExpenseItem[] = [];
  private num:Object[] = [{mynum:1}];
  private users: FirebaseListObservable< any[]>;
  constructor(private af : AngularFire) {

      this.initailise();
      this.users = af.database.object("/Users");
      console.log(this.users);
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
        console.log(this.users.expenseData);
        return this.expenseData;
    }
    getExpenseCategories():Object[]{
        return this.expenseCategories;
    }
    addToExpenseData(item:ExpenseItem){
        this.expenseData.push(item);
        this.num[0].mynum +=1;
        console.log(this.af.database.list("Users"));
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

    getExpenseSummary(type:string, value:string):Object[]{
        console.log("my value...");
        console.log(value);
        let filteredData :ExpenseItem[] = [];
        if(type == "daily") {
            for (let i = 0; i < this.expenseData.length; i++) {
                if (this.expenseData[i].date == value) {
                    filteredData.push(this.expenseData[i]);
                }
            }
        }

        if(type == "monthly") {
            var dateRegexp = /(\d{1,2})\-(\d{1,2})\-(\d{4})/;
            //var date = dateRegexp.exec("11/12/2014");
            for (let i = 0; i < this.expenseData.length; i++) {
                console.log(dateRegexp.exec(this.expenseData[i].date)[2]);
                if (dateRegexp.exec(this.expenseData[i].date)[2] == value) {
                    filteredData.push(this.expenseData[i]);
                }
            }
        }

        if(type == "weekly") {
            let weekDays = [];
            let next = value;
             weekDays.push(value);
            for(let i = 0 ;i < 6; i++){
                let bits = next.split('-');

                 next = ("0" + (Number(bits[0]) + 1)).slice(-2) + "-" + bits[1] + "-" + bits[2];

                 if(this.isValidDate(next)){
                     weekDays.push(next);
                      console.log(next);
                 }else{
                    if(Number(bits[1])!=12)
                        next = "01" + "-" +("0" + (Number(bits[1]) + 1)).slice(-2) + "-" + bits[2];
                    else
                        next = "01" + "-" +"01"  + "-" + (Number(bits[2])+1);
                   if(this.isValidDate(next)){
                     weekDays.push(next);
                    }
                 }
            }
            for (let i = 0; i < this.expenseData.length; i++) {
              for(let j =0; j< weekDays.length; j++ ) {
                  if (this.expenseData[i].date == weekDays[j]) {
                      filteredData.push(this.expenseData[i]);
                  }
              }
            }
        }


        for(let j =0 ; j< this.expenseSummary.length; j++) {
            this.expenseSummary[j].value = 0;
            for (let i = 0; i < filteredData.length; i++) {

                if (filteredData[i].category === this.expenseSummary[j].category) {
                    this.expenseSummary[j].value += Number(filteredData[i].value);
                }
            }
        }
        return this.expenseSummary;
    }


    isValidDate(s) {
        var bits = s.split('-');
        var y = bits[2],
            m = bits[1],
            d = bits[0];
        // Assume not leap year by default (note zero index for Jan)
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // If evenly divisible by 4 and not evenly divisible by 100,
        // or is evenly divisible by 400, then a leap year
        if ((!(y % 4) && y % 100) || !(y % 400)) {
        daysInMonth[1] = 29;
        }
        return !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[--m]
    }

}
