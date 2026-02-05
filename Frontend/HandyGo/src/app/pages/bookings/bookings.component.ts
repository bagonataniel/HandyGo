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
  bookingsAsClient:any[] = [];
  bookingsAsWorker:any[] = [];



  constructor(private bookingService:BookingService, private userService:UsersService, private serviceService:ServiceService){}

  ngOnInit(){

  }

  loadWorkerBookings(){
    this.bookingService.getWorkerBookings().pipe(
      switchMap((data)=> forkJoin(
        
        )
      )
    );
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