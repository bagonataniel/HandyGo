import { Component, ElementRef, HostListener, viewChild, ViewChild } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { ModalService } from '../../services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatPanelComponent } from '../chat-panel/chat-panel.component';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrl: './chat-side-nav.component.css'
})
export class ChatSideNavComponent {
  contacts: any[] = [];
  opened: boolean = false;
  isButtonDisabled: boolean = false;
  readonly drawer = viewChild.required<MatDrawer>('drawer');
  @ViewChild('drawer', { read: ElementRef})
  drawerContent!: ElementRef<HTMLElement>;

  @ViewChild('drawerToggleButton', { read: ElementRef })
  drawerToggleButton!: ElementRef<HTMLElement>;


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
    this.drawer().close();
    const dialogRef = this.dialog.open(ChatPanelComponent, {
      width: '35em',
      height: '40em',
      data: { uID: contact.uID, name: contact.name }
    });
    this.modalService.open(contact);

    dialogRef.afterClosed().subscribe(() => {
      this.isButtonDisabled = false;
      this.drawer().open();
    });
  }

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  if (this.drawer().opened == false) {
    return;
  }
  const target = event.target as Node;
  
  const clickedInsideDrawer =
    this.drawerContent.nativeElement.contains(target);

  const clickedToggleButton =
    this.drawerToggleButton.nativeElement.contains(target);

  if (!clickedInsideDrawer && !clickedToggleButton) {
    this.drawer().close();
  }
}

}

