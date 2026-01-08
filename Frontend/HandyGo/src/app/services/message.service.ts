import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket:Socket;

  constructor() { 
    this.socket = io('http://localhost:3000');
  }


  sendMessage(uID2:String, content:String): void {
    this.socket.emit('send-message',{from:localStorage.getItem('userId'),message:content,to:uID2});
  }

  GetMessages(uID2:String,callback:(messages:any[])=>void){
    this.socket.emit('get-messages',uID2,localStorage.getItem('userId'));
    this.socket.once('all-messages', (messages:any[]) => { callback(messages); });
  }

  RecieveNewMessage(callback:(mesage:any)=> void){
    this.socket.on('new-message', (message:any) => { callback(message); });
  }

}
