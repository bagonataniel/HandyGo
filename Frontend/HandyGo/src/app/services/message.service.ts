import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket:Socket;

  constructor() { 
    this.socket = io('http://localhost:3000');
    this.socket.on("room-status", (data)=>{
      //console.log('Room status received:', data);
    });
  }

  registerChat(){
    this.socket.emit('login', {uID:localStorage.getItem('userId')});
  }

  checkRoom(){
    this.socket.emit("check-room",{uID:localStorage.getItem('userId')});
  }

  sendMessage(uID2:String, content:String): void {
    this.socket.emit('send-message',{from:localStorage.getItem('userId'),message:content,to:uID2});
  }

  GetMessages(uID2:String,callback:(messages:any[])=>void){
    this.socket.emit('get-messages',uID2,localStorage.getItem('userId'));
    this.socket.once('all-messages', (messages:any[]) => { callback(messages); });
  }

  ReceiveNewMessage(): Observable<any> {
    return fromEvent(this.socket, 'new-message');
  }

}
