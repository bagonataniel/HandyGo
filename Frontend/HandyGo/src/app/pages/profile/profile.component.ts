import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileData: any[] = [];

  constructor(private users: UsersService) { }
  ngOnInit(): void {
    this.users.getUserDetails(localStorage.getItem("userId")).subscribe({
      next: (data: any) => {
        this.profileData = data;
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error fetching profile data:', error);
      }
    })
  }
}
