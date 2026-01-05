import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrl: './chat-side-nav.component.css'
})
export class ChatSideNavComponent {
  contacts: any[] = [];
  opened: boolean = false;

  constructor(private connectionService: ConnectionService) {
    this.loadContacts();
  }

  loadContacts() {
    this.connectionService.getConnections((connections:any)=>{
      this.contacts = connections;
    });
  }
}
