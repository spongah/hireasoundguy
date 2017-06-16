import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  loginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully logged in!', {cssClass: 'alert-success'});
        this.router.navigate(['/profile']);
        this.authService.storeUserData(data.token, data.user);
      } else {
        this.flashMessage.show('Failed to authenticate user.', {cssClass: 'alert-danger'});
        this.router.navigate(['/signin']);
      }
    });

  }

}
