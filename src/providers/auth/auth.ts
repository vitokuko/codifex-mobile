import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  url = "";

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(user: any) {

  }

  logout() {

  }
}
