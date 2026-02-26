import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HeroComponent } from '../../sections/hero/hero.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.errorMessage = 'Nincs bejelentkezve felhasználó.';
      this.isLoading = false;
      return;
    }

    this.usersService.getUserDetails(userId).subscribe({
      next: (data: any) => {
        this.user = data.user || data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Nem sikerült betölteni a profilodat.';
        this.isLoading = false;
        console.error('Hiba:', err);
      }
    });
  }

  deleteAccount(){
    if (confirm('Biztos, hogy törölni szeretnéd a fiókod?')) {
      this.usersService.deleteAccount();
      localStorage.clear();
      this.router.navigate([""])
    } else {
      return;
    }
  }

  getSkillsArray(): string[] {
    if (!this.user?.skills || this.user.skills.trim() === '') {
      return [];
    }
    return this.user.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
  }
}