import { Injectable } from '@angular/core';
import { Player } from './player';
import { TestSession } from './test-session';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import { StorageService } from '../service/storage.service';

@Injectable()
export class PlayerService {

  constructor(private storage: StorageService, private http: HttpClient) {
  }

  getPlayer(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + this.storage.getItem('jwt'),
        'content-type': 'application/json'})
    };
    return this.http.get('https://pd-social-server.herokuapp.com/users/'+id, httpOptions);
  }
  
  getTestSessionsByMedId(id: number): Observable<TestSession[]> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + this.storage.getItem('jwt'),
        'content-type': 'application/json'})
    };
    return this.http.get<TestSession[]>('https://pd-social-server.herokuapp.com/testSessions/search/byMedId?id='+id, httpOptions)
	 .map((data: any) => {
          return data._embedded.testSessions;
        });
  }
  
  getTestSessionsByPatientId(id: number): Observable<TestSession[]> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + this.storage.getItem('jwt'),
        'content-type': 'application/json'})
    };
    return this.http.get<TestSession[]>('https://pd-social-server.herokuapp.com/testSessions/search/byPatientId?id='+id, httpOptions)
	 .map((data: any) => {
          return data._embedded.testSessions;
        });
  }


  getPlayers(): Observable<Player[]> {
    const httpOptions = {
      headers: new HttpHeaders({authorization: 'Bearer ' + this.storage.getItem('jwt'),
        'content-type': 'application/json'})
    };
    return this.http.get<Player[]>('https://pd-social-server.herokuapp.com/users', httpOptions)
        .map((data: any) => {
          return data._embedded.users;
        });
  }


}
