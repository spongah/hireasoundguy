import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    console.log(user);
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log('Registration successful');
      } else {
        console.log('Registration failed');
      }
    });
  }

}
