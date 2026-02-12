import { Component} from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})

export class BookingsComponent {
  
  bookingsAsWorker:any[] = [];
  bookingsAsClient:any[] = [];

  selectableStatus = ['elfogadásra vár','folyamatban','kész','elutasítva'];

  constructor(private bookingService:BookingService){}

  async ngOnInit(){
    this.loadBookings();
  }

  loadBookings(){
    this.bookingService.getWorkerBookings().subscribe({
      next: (data: any) => {
        console.log(data.bookings);
        this.bookingsAsWorker = data.bookings;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    });
    this.bookingService.getClientsBookings().subscribe({
      next: (data: any) => {
        console.log(data);
        this.bookingsAsClient = data;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    });
  }

  statusSelected(booking_id:String,status:string){
    this.bookingService.updateBookingStatus(booking_id,status);
  }

}
