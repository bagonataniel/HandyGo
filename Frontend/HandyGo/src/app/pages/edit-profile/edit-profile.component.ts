import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isLoading = true;
  isSaving = false;
  errorMessage: string | null = null;

  formData = {
    name: '',
    bio: '',
    skills: '',
    location: ''
  };

  originalData: any = null;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.errorMessage = 'Nincs bejelentkezve felhasználó.';
      this.isLoading = false;
      return;
    }

    this.usersService.getUserDetails(userId).subscribe({
      next: (data: any) => {
        const user = data.user || data;
        this.originalData = { ...user };
        this.formData = {
          name: user.name || '',
          bio: user.bio || '',
          skills: user.skills || '',
          location: user.location || ''
        };
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Nem sikerült betölteni az adatokat.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  saveProfile() {
    this.isSaving = true;

    const changes: any = {};

    if (this.formData.name !== this.originalData.name) changes.name = this.formData.name;
    if (this.formData.bio !== this.originalData.bio) changes.bio = this.formData.bio;
    if (this.formData.skills !== this.originalData.skills) changes.skills = this.formData.skills;
    if (this.formData.location !== this.originalData.location) changes.location = this.formData.location;

    if (Object.keys(changes).length === 0) {
      this.isSaving = false;
      this.router.navigate(['/profile']);
      return;
    }


    this.usersService.updateAccountDetails(changes).subscribe({
      next: () => {
        this.isSaving = false;
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.isSaving = false;
        alert('Hiba történt a mentés során.');
        console.error('Mentési hiba:', err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/profile']);
  }
}