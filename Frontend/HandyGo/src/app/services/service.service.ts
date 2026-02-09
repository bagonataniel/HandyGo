import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http: HttpClient) { }

  public createService(data: any) {
    return this._http.post(`http://localhost:3000/service`, data, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public getMyServices() {
    return this._http.get(`http://localhost:3000/service/my-services`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public filterServices(lat: number, lon: number) {
    return this._http.get(`http://localhost:3000/service/${lat}/${lon}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  getServices(filters: { category?: string; distance?: number; priceRange?: [number, number] }) {
    let params = new HttpParams();

    return this._http
      .get<any>(`http://localhost:3000/users/${localStorage.getItem('userId')}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') || '' }
      })
      .pipe(
        switchMap(userData => {
          params = params
            .append('lat', userData.user.latitude)
            .append('lon', userData.user.longitude);

          if (filters.category) {
            params = params.append('category', filters.category);
          }
          if (filters.distance !== undefined && userData.user.latitude && userData.user.longitude) {
            params = params.append('distance', filters.distance.toString());
          }
          if (filters.priceRange) {
            params = params
              .append('minPrice', filters.priceRange[0].toString())
              .append('maxPrice', filters.priceRange[1].toString());
          }

          return this._http.get(`http://localhost:3000/service`, {
            headers: { 'x-auth-token': localStorage.getItem('token') || '' },
            params
          });
        })
      );
  }

  public getServiceById(id: string) {
    return this._http.get(`http://localhost:3000/service/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public updateService(id: string, data: any) {
    return this._http.put(`http://localhost:3000/service/update/${id}`, data, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public deleteService(id: string) {
    return this._http.delete(`http://localhost:3000/service/delete/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public writeReview(id: string, data: any) {
    return this._http.post(`http://localhost:3000/service/${id}/review`, data, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }

  public getReviews(id: string) {
    return this._http.get(`http://localhost:3000/service/${id}/reviews`, { headers: { 'x-auth-token': localStorage.getItem('token') || '' } });
  }
}
