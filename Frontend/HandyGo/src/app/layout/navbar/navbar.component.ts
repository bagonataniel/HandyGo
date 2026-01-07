import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HostListener, Injectable } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Injectable({providedIn: 'root'})
  isMobileMenuOpen = false;
  loggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = this.auth.loggedIn();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
    this.loggedIn = false;
    window.location.reload();
  }
  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.key === 'token') {
      if (!localStorage.getItem('token')) {
        this.logout();
      }
    }
  }
}