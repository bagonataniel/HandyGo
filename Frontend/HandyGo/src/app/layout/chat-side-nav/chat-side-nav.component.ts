import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrl: './chat-side-nav.component.css'
})
export class ChatSideNavComponent {
  contacts: any[] = [];
  opened: boolean = false;

  constructor(private connectionService: ConnectionService, private modalService: ModalService) {
    this.connectionService.login();
    this.loadContacts();
  }

  loadContacts() {
    this.connectionService.getConnections((connections:any)=>{
      this.contacts = connections;
    });
  }
  openChat(contact:any) {
    this.modalService.open(contact);
  }

}

