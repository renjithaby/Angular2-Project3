import { Component} from '@angular/core';
import { AngularFire } from 'angularfire2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    private user;
    private users ={};

    constructor(public af: AngularFire){
        this.af.auth.subscribe(user => {
            if (user) {
                // user logged in
                this.user = user;
                console.log(this.user);
                this.af.database.list('angular2project3').push(this.users);
                console.log(this.af.database.list('angular2project3'));
            }
        });
    }
    title = 'app works!';
    login() {

        this.af.auth.login();
    }

    logout() {
        this.af.auth.logout();
    }

}
