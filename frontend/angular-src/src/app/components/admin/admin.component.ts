import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users:any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get('http://localhost:8080/users/all').subscribe(res => {
      this.users = res.json();
      console.log(res.json());
    });
  }

}
