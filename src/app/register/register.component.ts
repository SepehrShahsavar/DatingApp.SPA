import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertifyService} from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private  auth: AuthService , private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  register() {
    this.auth.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
    } , error => {
      this.alertify.error(error);
    });
  }

  cancelled() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
