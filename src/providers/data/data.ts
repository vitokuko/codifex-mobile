import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
 Generated class for the DataProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class DataProvider {

  urlBase = "http://codifex-api.herokuapp.com/api/";
  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post("http://codifex-api.herokuapp.com/api/etudiants/login", data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      this.http.post("http://codifex-api.herokuapp.com/api/etudiants", data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  addData(url,data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlBase + url,data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getData(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlBase + url)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getDataWithId(url,id){
    return new Promise((resolve, reject) => {
      this.http.get(this.urlBase + url + '/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
