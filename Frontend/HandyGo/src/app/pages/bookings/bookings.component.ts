import { Component} from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { UsersService } from '../../services/users.service';
import { ServiceService } from '../../services/service.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})

export class BookingsComponent {
  bookingsAsClient:clientBooking[] = [];
  bookingsAsWorker: any[] = [];



  constructor(private bookingService:BookingService, private userService:UsersService, private serviceService:ServiceService){}

  ngOnInit(){
    this.loadWorkerBookings();
  }

  loadWorkerBookings(){
    this.bookingService.getWorkerBookings().subscribe({
      next: (data: any) => {
        this.bookingsAsWorker = data;
        console.log(this.bookingsAsWorker);
        this.bookingsAsWorker.map(x => {
          console.log(x);
        });
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
  

  loadUser(data:any):any{
    this.userService.getUserDetails(data).subscribe({
      next:(data:any)=>{
        return data.name;
      },
      error:(err)=>{
        console.log(err);
        return "[error service]";
      }
    });
  }
  
  loadService(data:any):any{
    this.serviceService.getServiceById(data).subscribe({
      next: (data:any) =>{
        return data.title;
      },
      error:(err) =>{
        console.log(err);
        return "[error name]"
      }
    });
    
  }

}

export interface WorkerBooking {
  id: number;
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