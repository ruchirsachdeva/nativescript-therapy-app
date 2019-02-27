import { Injectable } from '@angular/core';
import { Player } from './player';
import { TestSession } from './test-session';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import { StorageService } from '../service/storage.service';
import {JsonHttpService} from "../service/json-http.service";

@Injectable()
export class PlayerService {

  constructor(private storage: StorageService, private http: JsonHttpService) {
  }

  getPlayer(id: number): Observable<any> {
        return this.http.get('https://pd-social-server.herokuapp.com/users/'+id);
  }
  
  getTestSessionsByMedId(id: number): Observable<TestSession[]> {

    return this.http.get<TestSession[]>('https://pd-social-server.herokuapp.com/testSessions/search/byMedId?id='+id)
	 .map((data: any) => {
          return data._embedded.testSessions;
        });
  }
  
  getTestSessionsByPatientId(id: number): Observable<TestSession[]> {
    return this.http.get<TestSession[]>('https://pd-social-server.herokuapp.com/testSessions/search/byPatientId?id='+id)
	 .map((data: any) => {
          return data._embedded.testSessions;
        });
  }


  getPlayers(): Observable<Player[]> {

    return this.http.get<Player[]>('https://pd-social-server.herokuapp.com/users')
        .map((data: any) => {
          return data._embedded.users;
        });
  }


}
