import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Client } from '../shared/product.model'
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 // list : Product[];
  formData : Client;
  //readonly rootURL = "https://localhost:44368";
  readonly rootURL = "https://localhost:44311"; 
  
  constructor(private http: HttpClient) { }


 
  postClient(ClientformData : Client): Observable<Client>{
    // if you use a new guid set here... 
    // currenly this is set for auto generated ID in SQL...
    ClientformData.ClientID = 0;
    return this.http.post<Client>(this.rootURL+'/api/Client', ClientformData,{
      headers: new HttpHeaders({
       'Content-Type':'application/json'
        })
      });
  }

  postClientAddress(ClientAddressformData : Client): Observable<Client>{
    // if you use a new guid set here... 
    // currenly this is set for auto generated ID in SQL...
    ClientAddressformData.ClientAddressID = 0;
    return this.http.post<Client>(this.rootURL+'/api/ClientAddress', ClientAddressformData,{
      headers: new HttpHeaders({
       'Content-Type':'application/json'
        })
      });
  }

  updateClient(ClientformData : Client): Observable<void>{

   // alert(this.rootURL+'/api/album/' + formData.AlbumId)
    return this.http.put<void>(this.rootURL+'/api/Client/' + ClientformData.ClientID, ClientformData,{
     headers: new HttpHeaders({
      'Content-Type':'application/json'
       })
     });
  }

  updateClientAddress(ClientAddressformData : Client): Observable<void>{

    // alert(this.rootURL+'/api/album/' + formData.AlbumId)
     return this.http.put<void>(this.rootURL+'/api/ClientAddress/' + ClientAddressformData.ClientAddressID, ClientAddressformData,{
      headers: new HttpHeaders({
       'Content-Type':'application/json'
        })
      });
   }

  deleteClient(ClientID : number): Observable<void>{
    return this.http.delete<void>(this.rootURL+'/api/Client/' + ClientID);
   
  }
  // getAlbum(){

  //   return this.http.get(this.rootURL+'/album')
  //   .toPromise().then(res => this.list = res as Product[])




  // }
getClient(): Observable<Client[]>{

    return this.http.get<Client[]>(this.rootURL+'/api/Client');
   // headers: new HttpHeaders({
    //  'Accept': 'application/json'
   // })
   // })
    //.toPromise().then(res => this.list = res as Product[])
  }

 

  // private _listners = new Subject<any>();
  // listen(): Observable<any>{
  //   return this._listners.asObservable();
  // }
  // filter(filterBy: string){
  //   this._listners.next(filterBy);
  // }
}
