import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";

var mergeAuthToken = (jwt, options: any = {}) => {
  var headers_object = new HttpHeaders(options.headers);
  headers_object = headers_object.set('Content-Type', 'application/json');

  if (jwt) {
    headers_object =  headers_object.set('authorization', 'Bearer ' + jwt);
  }

  const httpOptions = {
    headers: headers_object
  };
  return httpOptions;
};
@Injectable({
  providedIn: 'root'
})
export class JsonHttpService {


  constructor(private http: HttpClient, private storage: StorageService) {
  }

  get<T>(url: string, options: any = {}): Observable<T> {
    return this.http.get<T>(url, mergeAuthToken(this.storage.getItem('jwt'), options));
  }

  post<T>(url: string, body: any, options: any = {}): Observable<T> {
    console.log('hello');
    let opt = mergeAuthToken(this.storage.getItem('jwt'), options);
    console.log('opt');
    console.log(opt);
    return this.http.post<T>(url, body, opt);
  }

  put<T>(url: string, body: any, options: any = {}): Observable<T> {
    return this.http.put<T>(url, body, mergeAuthToken(this.storage.getItem('jwt'), options));
  }

  delete<T>(url: string, options: any = {}): Observable<T> {
    return this.http.delete<T>(url, mergeAuthToken(this.storage.getItem('jwt'), options));
  }

  patch<T>(url: string, body: any, options: any = {}): Observable<T> {
    return this.http.patch<T>(url, body, mergeAuthToken(this.storage.getItem('jwt'), options));
  }

  head<T>(url: string, options: any = {}): Observable<T> {
    return this.http.head<T>(url, mergeAuthToken(this.storage.getItem('jwt'), options));
  }
}
