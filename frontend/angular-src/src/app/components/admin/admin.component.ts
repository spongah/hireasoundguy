import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:any;

  constructor(
    private http: Http,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get('http://localhost:8080/users/all').subscribe(res => {
      this.users = res.json();
    });
  }

  deleteUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/users/delete', user, { headers: headers }).map(res => res.json()).subscribe(data => {
      if (data.success) {
        console.log(data.message);
        this.getAllUsers();
      }
    });
  }

}
