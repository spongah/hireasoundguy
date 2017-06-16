import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  clickLogout() {
    console.log('LOGGED OUT');
    this.flashMessages.show('Successfully logged out', {cssClass: 'alert-success'});
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
