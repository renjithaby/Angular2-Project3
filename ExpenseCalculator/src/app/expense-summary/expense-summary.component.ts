import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit {
    private expenseSummary:Object[];
    private totalExpense:number;
    private summaryType: string = "monthly";

    constructor(private mainService:MainService, private route : ActivatedRoute,private router : Router) {

    }


    ngOnInit() {
        this.totalExpense = "200";
        this.expenseSummary = this.mainService.getExpenseSummary();
        this.route.params.subscribe(params => {this.summaryType = params; console.log(params)});
    }

    onClick(event){
        console.log(event.target.id);
        this.router.navigate(['expenseSummary',event.target.id]);

    }


}