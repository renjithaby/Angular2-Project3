import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit {
    private expenseSummary:Object;
    private totalExpense:number;
  constructor() { }


  ngOnInit() {
      this.totalExpense = "200";
      this.expenseSummary = [{

          category:"a",
          value :"100"
      },
      {

          category:"b",
          value :"10"
      },
      {

          category:"c",
          value :"20"
      },
      {

          category:"d",
          value :"30"
      }
      ]
  }



}
