import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService) { }

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
        console.log(data);
      } else {
        console.log('Failed to authenticate user.');
        console.log(data);
      }
    });
  }

}
