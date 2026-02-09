import { Component} from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { UsersService } from '../../services/users.service';
import { ServiceService } from '../../services/service.service';
import { forkJoin, share, switchMap } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})

export class BookingsComponent {
  
  loadedWorkerBookings:any[] = [];
  loadedClientBookings:any[] = [];



  constructor(private bookingService:BookingService, private userService:UsersService, private serviceService:ServiceService){}

  async ngOnInit(){
    this.loadBookings();
  }

  loadBookings(){
    this.bookingService.getWorkerBookings().subscribe({
      next: (data: any) => {
        console.log(data.bookings);
        this.loadedWorkerBookings = data.bookings;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    });
    this.bookingService.getClientsBookings().subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadedClientBookings = data;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    });
  }

}

export interface WorkerBooking {
  id: string;
  hisName: string;
  serviceName: string;
  status: string;
  date: string;
}

export interface clientBooking{
    serviceName:string,
    userName:string,
    userID:string,
    status:string,
    id:number
}