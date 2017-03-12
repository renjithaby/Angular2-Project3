import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Router} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

  constructor(public af: AngularFire, private router : Router) { }

  ngOnInit() {
  }

    logout() {
        this.af.auth.logout().then(() => {
            console.log('Logged out!');
            console.log(this.af.auth);
            this.router.navigate(['Home']);

        });



    }

}
