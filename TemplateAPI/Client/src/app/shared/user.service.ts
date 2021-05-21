import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

 // readonly rootUrl = 'https://localhost:44368';
  readonly rootUrl = 'https://localhost:44311'
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   }
   public get currentUserValue(): User {
    return this.currentUserSubject.value;
   }
  registerUser(user: User) {
    console.log(user);
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  login(username: string, password: string) {
    alert('got here..')
    return this.http.post<any>(this.rootUrl + '/api/token', { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            console.log(user);
            return user;

        }));
       
}

  userAuthentication(userName, password) {
    //alert(userName + password);
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims',
   {headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
   
   
  }

}
