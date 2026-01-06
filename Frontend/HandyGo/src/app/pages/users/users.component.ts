import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  id:string = '';

  constructor(private users: UsersService){}

  ngOnInit(): void {
    this.id = window.location.pathname.split('/').pop() || '';
    this.users.getUserDetails(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    })
  }
}
