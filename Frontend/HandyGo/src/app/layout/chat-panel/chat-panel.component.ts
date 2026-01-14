import { Component , ElementRef, OnInit ,ViewChild} from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ModalService } from '../../services/modal.service';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  isOpen: boolean = false;
  otherUserId: string = '';
  otherUserName: string = '';
  messages: any[] = [];
  subscriptions: any[] = [];
  newMessage:string='';

  constructor(private messageService: MessageService, private modalService: ModalService, private connectionService: ConnectionService) {}

  ngOnInit() {
    this.connectionService.login();
    this.subscriptions.push(
      this.modalService.open$.subscribe(open => {
        this.isOpen = open;
      })
    );
    this.subscriptions.push(
      this.modalService.data$.subscribe({
        next: (data) => {
          if (!data) return;
          this.otherUserId = data.uID;
          this.otherUserName = data.name;

        this.messageService.GetMessages(this.otherUserId,(messages) => {
          this.messages = messages;
        });
      },
      error: (error) => {
        console.error('Error loading chat data:', error);
      }
    }));
    this.messageService.RecieveNewMessage((message) => {
      console.log('New message received:', message);
      if (message.from !== this.otherUserId) return;
      this.messages.push(message);
    })
  }
  
  sendMessage(content: string){
    if(!content || content.trim() === '') return;
    this.messageService.sendMessage(this.otherUserId, content);
    this.messages.push({from:localStorage.getItem('userID'),message:content, to:this.otherUserId});
    this.newMessage = '';
  }


  ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}