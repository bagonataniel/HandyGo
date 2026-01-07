import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();

  constructor(private _http: HttpClient, private ngZone: NgZone) {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'token') {
        this.ngZone.run(() => {
          this.tokenSubject.next(event.newValue);
        });
      }
    });
   }

  get isVerified() {
    return localStorage.getItem('isVerified');
  }

  setVerified(value: boolean) {
    return localStorage.setItem('isVerified', value.toString());
  }

  public loggedIn(){
    return !!localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isVerified');
  }

  public login(data:any){
    return this._http.post('http://localhost:3000/auth/login', data);
  }

  public register(data:any){
    return this._http.post('http://localhost:3000/auth/register', data);
  }
}
