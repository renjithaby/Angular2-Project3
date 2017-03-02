import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {ExpenseItem} from '../expenseItem';
import {MainService} from '../main.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
    private addExpenseForm: FormGroup;
    private categories:Array;
    private selectedDate : string;
    private newItem : ExpenseItem;
    private expenseData : ExpenseItem[] = [];
    private  selectedDateData : ExpenseItem[] = [];
    private num:Object[] =[];

  constructor(private fb : FormBuilder, private datePipe : DatePipe,private mainService: MainService) {
      this.createForm();
  }

  ngOnInit() {
      this.categories = this.mainService.getExpenseCategories();
      this.expenseData = this.mainService.getExpenseData();
      this.num = this.mainService.getTotalNum();
  }

  createForm(){
    this.addExpenseForm = this.fb.group({
        date: ['', Validators.required ],
        category:['', Validators.required ],
        value:['', Validators.required ]
    });
  }
  onSubmit() {
      this.newItem =  new ExpenseItem(this.datePipe.transform(this.addExpenseForm.value.date, 'yyyy-MM-dd'),
          this.addExpenseForm.value.category,
          this.addExpenseForm.value.value);
          console.log(this.newItem.value);
      this.mainService.addToExpenseData(this.newItem);
      this.updateSelectedDateData();
  }
    onSelect(value){
       this.selectedDate = this.datePipe.transform(this.addExpenseForm.value.date, 'yyyy-MM-dd');
        this.updateSelectedDateData();
    }

    deleteItem(item){
        this.mainService.removeFromExpenseData(item);
        this.updateSelectedDateData();
    }

    updateSelectedDateData(){
        this.selectedDateData = [];
        for (let i =0; i<this.expenseData.length; i++){
            if(this.expenseData[i].date === this.selectedDate ){
                this.selectedDateData.push(this.expenseData[i]);
            }
        }
    }

}
