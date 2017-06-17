import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ValidateService {

  constructor(
    private http: Http
  ) { }

    validateRegister(user) {
      if (!user.name || !user.email || !user.username || !user.password){
        return false;
      } else {
        return true;
      }
    }

    validateUsername(username, callback) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/users/findbyusername', { username: username }, { headers: headers })
        .map(res => res.json()).subscribe(data => {
          if (data.username == username) {
            callback(false);
          } else {
            callback(true);
          }
      });
    }

    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
}
