import { Component} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Router} from '@angular/router';
import {MainService} from './main.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    private user;
    //private users ={};
    private users: FirebaseListObservable< any[]>;

    constructor(public af: AngularFire , private router : Router,private mainService : MainService){
   //this.users =  this.af.database.list("/Items") as FirebaseListObservable<any[]>;
    //this.users =  af.database.object("/Items");
       // console.log(this.users);
      //  console.log(af.database.object);
       // this.users = af.database.object('https://angular2project3.firebaseio.com/Items');
       // console.log(this.users);
       /* af.database.object('https://angular2project3.firebaseio.com/Items').subscribe(value =>{
            console.log(value);
            this.users = value;
        });*/

        this.af.auth.subscribe(user => {
            if (user) {
                // user logged in
                this.user = user;
                console.log(this.user);
                this.router.navigate(['Home']);
                this.mainService.setCurrentUser(this.user);
                this.mainService.getUser(this.user.uid).subscribe(value =>
                {
                    this.users = value;
                    console.log(this.users[0]);
                    if(this.users.length == 0){
                        this.mainService.addUser({"id": this.user.uid, "names": this.user.auth.displayName});
                    }
                });
            }else{
                this.user = null;
                console.log(this.user);
            }
        });
    }
    title = 'app works!!';
    login() {

        this.af.auth.login();
    }



}
