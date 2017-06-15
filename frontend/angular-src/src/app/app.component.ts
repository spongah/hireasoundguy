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
      (String(this.router.url).startsWith('/home')) ||
      (String(this.router.url).startsWith('/profile')) ||
      (String(this.router.url).startsWith('/register')) ||
      (String(this.router.url).startsWith('/signin')) ||
      (String(this.router.url).startsWith('/logout')) ||
      (String(this.router.url).startsWith('/admin'))
    ) {
      return true;
    } else {
      return false;
    }
  }

}
