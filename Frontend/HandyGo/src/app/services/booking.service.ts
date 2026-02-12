import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http: HttpClient) { }

  public createBooking(id:any){
    return this._http.post('http://localhost:3000/booking', {"service_id":id}, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }
  
  public getBookingDetails(id:any){
    return this._http.get(`http://localhost:3000/booking/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public getClientsBookings(){
    return this._http.get<any[]>('http://localhost:3000/booking/bookings/client', { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public getWorkerBookings(){
    return this._http.get<any[]>('http://localhost:3000/booking/bookings/worker', { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public updateBookingStatus(id:any, status:any){
    return this._http.put(`http://localhost:3000/booking/${id}/status`, {status}, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public deleteBooking(id:any){
    return this._http.delete(`http://localhost:3000/booking/delete/${id}`,{ headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }
}
