import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertifyService} from '../services/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public auth: AuthService , private alertify: AlertifyService , private router: Router) { }

  ngOnInit(): void {
  }

  login() {
      this.auth.login(this.model).subscribe(next =>{
        this.alertify.success('logged in successfully ');
      } , error => {
        this.alertify.error(error);
      } , () => {
        this.router.navigate(['/members']);
      });
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
