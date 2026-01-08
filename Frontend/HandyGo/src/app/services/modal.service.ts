import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _data  = new BehaviorSubject<any>(null);
  private _open = new BehaviorSubject<boolean>(false);
  open(data: any): void {
    this._data.next(data);
    this._open.next(true);
  }

  close(): void {
    this._open.next(false);
  }

  get data$(){
    return this._data.asObservable();
  }

  get open$(){
    return this._open.asObservable();
  }

  constructor() { }
}
