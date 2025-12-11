import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  userId: string = "012085ad-d674-11f0-a1e3-309c23b76b61";
  userData: any = {"bio": "teszt bio", "skills": "teszt skill", "location": "Kalocsa"};

  constructor(private userService: UsersService) {}

  getUserDetailsBtn(id:any){
    this.userService.getUserDetails(id).subscribe({
      next: (data) => {
        console.log('User details:', data);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
  updateAccountDetailsBtn(data:any){
    this.userService.updateAccountDetails(data).subscribe({
      next: (data) => {
        console.log('User details:', data);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
  deleteAccountBtn(){
    this.userService.deleteAccount().subscribe({
      next: (data) => {
        console.log('User details:', data);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
  getUserServicesBtn(id:any){
    this.userService.getUserServices(id).subscribe({
      next: (data) => {
        console.log('User details:', data);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
}
