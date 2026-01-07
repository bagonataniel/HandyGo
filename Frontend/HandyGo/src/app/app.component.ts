import { Component } from '@angular/core';
import { HostListener, Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'handygo';
  isLoggedIn:boolean=false;

  constructor(private auth: AuthService) {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    }
    this.auth.token$.subscribe(token => {
      this.isLoggedIn = token !== null;
    });
  }
  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'token') {
      this.isLoggedIn = event.newValue !== null;
    }
  }
}
