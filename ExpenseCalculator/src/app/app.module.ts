import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {CalendarModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

const routes :Routes = <Routes>[

    {path: 'Home', component: ExpenseSummaryComponent},
    {path: 'addExpense', component: AddExpenseComponent},
    /*{path: 'FreshFruits/:type', component: ItemsListComponent},
    /*{path: 'Apples', component: ItemsListComponent,data: { value: 'Apples' }},
     {path: 'Banana', component: ItemsListComponent,data: { value: 'Banana' }},
     {path: 'Grapes', component: ItemsListComponent},
    {path: "MySavedList", component: SavedListComponent},
    {path: "MyBasket", component: MyBasketComponent},*/
    {path: '', redirectTo: '/Home',pathMatch: 'full'},
    { path: '**', redirectTo: '/Home',pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseSummaryComponent,
    MainNavigationComponent,
    AddExpenseComponent
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    FormsModule,
      ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes,{useHash : true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
