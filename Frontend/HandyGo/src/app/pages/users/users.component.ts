import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  id:string = '';

    user: any = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.id = window.location.pathname.split('/').pop() || '';
    this.usersService.getUserDetails(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    });
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = this.id;

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

  getSkillsArray(): string[] {
    if (!this.user?.skills || this.user.skills.trim() === '') {
      return [];
    }
    return this.user.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
  }

}
