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

  private newMessageListener: ((message: any) => void) | null = null;

  ReceiveNewMessage(callback: (message: any) => void) {
    
    if (this.newMessageListener) {
      this.socket.off('new-message', this.newMessageListener);
    }
    this.newMessageListener = (message: any) => { callback(message); console.log('New message listener triggered'); };
    this.socket.on('new-message', this.newMessageListener);
  }

  RemoveNewMessageListener() {
    if (this.newMessageListener) {
      this.socket.off('new-message', this.newMessageListener);
      this.newMessageListener = null;
      console.log('Stopped listening for new messages');
    }
  }
}
