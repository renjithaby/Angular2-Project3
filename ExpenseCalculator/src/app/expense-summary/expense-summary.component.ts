import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {ActivatedRoute,Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit {
    private expenseSummary:Object[];
    private totalExpense:number;
    private summaryType: string = "monthly";
    private monthControl : FormControl;
    private weekControl : FormControl;
    private dayControl : FormControl;

    constructor(private mainService:MainService, private route : ActivatedRoute,private router : Router,private fb : FormBuilder, private datePipe : DatePipe) {
        this.createFormControls();
    }

    createFormControls(){
        this.monthControl = new FormControl(' ', Validators.required);
        this.weekControl = new FormControl(' ', Validators.required);
        this.dayControl = new FormControl(' ', Validators.required);
    }

    ngOnInit() {
        this.totalExpense = "200";
       // this.expenseSummary = this.mainService.getExpenseSummary();
        this.route.params.subscribe(params => {this.summaryType = params.id; console.log(params)});
        this.expenseSummary = this.mainService.getExpenseSummary(this.summaryType);
        console.log(this.summaryType);
    }

    onClick(event){
        console.log(event.target);
        this.router.navigate(['expenseSummary',event.target.id]);

    }

    onSelect(value){
        console.log(value);
    }


}