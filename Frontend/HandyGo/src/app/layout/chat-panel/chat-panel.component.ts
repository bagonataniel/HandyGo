import { Component , OnInit} from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ModalService } from '../../services/modal.service';

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

  constructor(private messageService: MessageService, private modalService: ModalService) {}

  ngOnInit() {

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
        console.log('Chat opened with:', this.otherUserName);

        this.messageService.GetMessages(this.otherUserId,(messages) => {
          this.messages = messages;
          console.log('Messages loaded:', messages);
        });
      },
      error: (error) => {
        console.error('Error loading chat data:', error);
      }
    }));
  }
  
  ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
