import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
    private addExpenseForm: FormGroup;
    private categories:Array;

  constructor(private fb:FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
      this.categories = [
          { id:1,
            name:"a"
          },
          { id:2,
            name:"b"
          },
          { id:3,
            name:"c"
          }
      ]
  }

  createForm(){
    this.addExpenseForm = this.fb.group({
        date: ['', Validators.required ],
        category:['', Validators.required ],
        value:['', Validators.required ]
    });
  }
  onSubmit() {
      const formModel = this.addExpenseForm.value;
      console.log(formModel);
  }

}
