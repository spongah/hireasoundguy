import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessage : FlashMessagesService
  ) { }

  ngOnInit() {
  }

  loginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    console.log(user);
    this.authService.authUser(user).subscribe(data => {
      if (data.success) {
        console.log('Successfully logged in!');
        this.flashMessage.show('Successfully logged in!', {cssClass: 'alert-success'});
        console.log(data);
      } else {
        console.log('Failed to authenticate user.');
        this.flashMessage.show('Failed to authenticate user.', {cssClass: 'alert-danger'});
        console.log(data);
      }
    });

  }

}
