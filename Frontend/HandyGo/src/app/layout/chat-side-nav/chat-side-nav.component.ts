import { Component, ViewChild } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { ModalService } from '../../services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatPanelComponent } from '../chat-panel/chat-panel.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrl: './chat-side-nav.component.css'
})
export class ChatSideNavComponent {
  contacts: any[] = [];
  opened: boolean = false;
  isButtonDisabled: boolean = false;
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private connectionService: ConnectionService, private modalService: ModalService, private dialog: MatDialog) {
    this.connectionService.login();
    this.loadContacts();
  }


  loadContacts() {
    this.connectionService.getConnections((connections:any)=>{
      this.contacts = connections;
    });
  }
  openChat(contact:any) {
    this.isButtonDisabled = true;
    this.drawer.close();
    const dialogRef = this.dialog.open(ChatPanelComponent, {
      width: '35em',
      height: '40em',
      data: { uID: contact.uID, name: contact.name }
    });
    this.modalService.open(contact);

    dialogRef.afterClosed().subscribe(() => {
      this.isButtonDisabled = false;
      this.drawer.open();
    });
  }

  

}

