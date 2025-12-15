import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

    constructor(private _http: HttpClient) { }
  
    public createService(data:any){
      return this._http.post(`http://localhost:3000/service`, data, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
    }

    public filterServices(lat: number, lon: number){
      return this._http.get(`http://localhost:3000/service/${lat}/${lon}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
    }

    public getServices(){
      return this._http.get(`http://localhost:3000/service`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
    }

    public getServiceById(id: string){
      return this._http.get(`http://localhost:3000/service/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
    }

    public updateService(id: string, data:any){
      return this._http.put(`http://localhost:3000/service/update/${id}`, data, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
    }

    public deleteService(id: string){
      return this._http.delete(`http://localhost:3000/service/delete/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
    }

    public writeReview(id: string, data:any){
      return this._http.post(`http://localhost:3000/service/${id}/review`, data, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
    }
}
