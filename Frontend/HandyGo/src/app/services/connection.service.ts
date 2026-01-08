import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private socket:Socket;


  constructor() {
    this.socket = io('http://localhost:3000');
  }
  
  login(): void {
    this.socket.emit('login', {uID:localStorage.getItem('userId')});
  }
  createConnection(uID2:String): void {
    this.socket.emit('create-connection',{uID1:localStorage.getItem('userId'),uID2:uID2});
  }
  getConnections(callback:(connections:any[]) => void){
    this.socket.emit("get-connections");
    this.socket.once('all-connections', (connections:any[]) => { callback(connections);} );
  }
}
