import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-chat-side-nav',
  templateUrl: './chat-side-nav.component.html',
  styleUrl: './chat-side-nav.component.css'
})
export class ChatSideNavComponent {


  connections:any[] = [];

  sidenavOpened: boolean = true;

  constructor(private connectionService:ConnectionService){
    this.connectionService.login();
    
    this.connectionService.getConnections(localStorage.getItem('userId') || '', (connections:any[]) => {
      this.connections = connections;
      console.log(this.connections);
    });
  }

}
