import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  public login(data:any){
    return this._http.post('http://localhost:3000/auth/login', data);
  }

  public register(data:any){
    return this._http.post('http://localhost:3000/auth/register', data);
  }
}
