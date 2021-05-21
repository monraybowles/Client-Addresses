import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Client } from '../shared/product.model'
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 // list : Product[];
  formData : Client;
  //readonly rootURL = "https://localhost:44368";
  readonly rootURL = "https://localhost:44311"; 
  
  constructor(private http: HttpClient) { }

 
  postClient(formData : Client): Observable<Client>{
    // if you use a new guid set here... 
    // currenly this is set for auto generated ID in SQL...
    formData.ClientID = 0;
    return this.http.post<Client>(this.rootURL+'/api/Client', formData,{
      headers: new HttpHeaders({
       'Content-Type':'application/json'
        })
      });
  }

 

}
