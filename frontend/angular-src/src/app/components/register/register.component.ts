import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Missing required fields.', {cssClass: 'alert-danger'});
      return false;
    }

    // required fields
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Invalid e-mail address.', {cssClass: 'alert-danger'});
      return false;
    }

    // register user
    console.log(user);
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Registration successful, you may now log in!', {cssClass: 'alert-success'});
        this.router.navigate(['/signin']);
      } else {
        this.flashMessages.show('Registration failed.', {cssClass: 'alert-danger'});
        this.router.navigate(['/register']);
      }
    });
  }

}
