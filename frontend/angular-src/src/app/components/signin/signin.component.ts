import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  loginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    console.log(user);
  }

}
