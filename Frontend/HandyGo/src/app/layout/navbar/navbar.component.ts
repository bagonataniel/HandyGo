import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
    this.loggedIn = false;
  }
}