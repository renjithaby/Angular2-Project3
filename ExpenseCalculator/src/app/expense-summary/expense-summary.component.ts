import { Component, OnInit, OnChanges } from '@angular/core';
import {MainService} from '../main.service';
import {ActivatedRoute,Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl,ReactiveFormsModule} from '@angular/forms';
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
    private summarySelectorForm: FormGroup;
    private users ;
    private  months = [
        {name:"January",value :"01"},
        {name:"February",value :"02"},
        {name:"March",value :"03"},
        {name:"April",value :"04"},
        {name:"May",value :"05"},
        {name:"June",value :"06"},
        {name:"July",value :"07"},
        {name:"August",value :"08"},
        {name:"September",value :"09"},
        {name:"October",value :"10"},
        {name:"November",value :"11"},
        {name:"December",value :"12"}
     ];

    private minDate:Date;

    constructor(private mainService:MainService, private route : ActivatedRoute,private router : Router,private fb : FormBuilder, private datePipe : DatePipe) {
        this.createFormControls();
        this.minDate = new Date();
    }

    createFormControls(){
        this.summarySelectorForm = this.fb.group({
        month: ['', Validators.required ],
        weekStart:['', Validators.required ],
        day:['', Validators.required ]
    });
    }

    ngOnInit() {
    console.log("calling ng on init.....");

        this.totalExpense = 0;
       // this.expenseSummary = this.mainService.getExpenseSummary();
        this.route.params.subscribe(params => {this.summaryType = params.id;});
        console.log(this.summaryType );
    }

    ngOnChanges(changes) {

        console.log("calling ng on updates...");
    }

    onClick(event){
        console.log(event.target);
        this.router.navigate(['expenseSummary',event.target.id]);
        this.expenseSummary = [];
        this.totalExpense = 0;
        this.summarySelectorForm.reset();
        /*this.summarySelectorForm.value.day = "";
        this.summarySelectorForm.value.month = "";
        this.summarySelectorForm.value.weekStart = "";*/
        this.mainService.getData().subscribe(item =>{console.log(item);

        });

        this.mainService.addData() ;

    }

    onSelect(){


    let value ="";
    switch(this.summaryType){
        case "monthly":
        value = this.summarySelectorForm.value.month;
        break;
         case "weekly":
         value =  this.datePipe.transform(this.summarySelectorForm.value.weekStart, 'dd-MM-yyyy');//this.summarySelectorForm.value.weekStart;
        break;
         case "daily":
         value = this.datePipe.transform(this.summarySelectorForm.value.day, 'dd-MM-yyyy');
        break;
    }
        this.expenseSummary = [];
        this.totalExpense = 0;
      console.log(this.summarySelectorForm.value.month);
      console.log(this.summarySelectorForm.value.weekStart);
      console.log(this.summarySelectorForm.value.day);
      this.expenseSummary = this.mainService.getExpenseSummary(this.summaryType,value);

        this.calculateTotalExpense();
        console.log(this.summaryType);

    }

    onChange(value){
        console.log("on chnage...");
        console.log(value);
    }


    calculateTotalExpense(){
        for(let i = 0; i< this.expenseSummary.length;i++){
            this.totalExpense += this.expenseSummary[i].value;
        }


    }




}