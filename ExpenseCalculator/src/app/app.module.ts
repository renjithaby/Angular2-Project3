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

import { DatePipe } from '@angular/common';
import {MainService} from './main.service';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


const firebaseConfig = {
    apiKey: "AIzaSyDf3EYDdRDc0JAbVwLqqyPH-kmZCTM3cgo",
    authDomain: "angular2project3.firebaseapp.com",
    databaseURL: "https://angular2project3.firebaseio.com",
    storageBucket: "angular2project3.appspot.com",
    messagingSenderId: "890945528507"
};

const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
};


const routes :Routes = <Routes>[

    {path: 'Home', component: ExpenseSummaryComponent},
    {path: 'addExpense', component: AddExpenseComponent},
    {path: 'expenseSummary', component: ExpenseSummaryComponent},
    {path: 'expenseSummary/:id', component: ExpenseSummaryComponent},
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
    RouterModule.forRoot(routes,{useHash : true}),
    AngularFireModule.initializeApp( firebaseConfig,firebaseAuthConfig)

  ],
  providers: [DatePipe,MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
