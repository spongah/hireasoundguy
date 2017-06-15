import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App Component';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  showNav():boolean {
    if (
      (this.router.url == "/home") ||
      (this.router.url == "/profile") ||
      (this.router.url == "/register") ||
      (this.router.url == "/signin") ||
      (this.router.url == "/logout")
    ) {
      return true;
    } else {
      return false;
    }
  }

}
