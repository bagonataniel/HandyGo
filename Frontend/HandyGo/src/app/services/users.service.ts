import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  public getUserDetails(id:any){
    return this._http.get(`http://localhost:3000/users/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public updateAccountDetails(data:any){
    return this._http.put(`http://localhost:3000/users/update`, data, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public deleteAccount(){
    return this._http.delete(`http://localhost:3000/users/removeaccount`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public getUserServices(id:any){
    return this._http.get(`http://localhost:3000/users/${id}/services`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }
}
