import { Component} from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})

export class BookingsComponent {

  
  
  bookingsAsWorker:any[] = [];
  bookingsAsClient:any[] = [];

  selectableStatus = ['elfogadásra vár','folyamatban','kész','elutasítva'];
  stars = [1,2,3,4,5];
  hoveredIndex: number|null = null;
  selectedRating = 0;

  constructor(private bookingService:BookingService, private serviceService:ServiceService){}

  async ngOnInit(){
    this.loadBookings();
  }

  loadBookings(){
    this.bookingService.getWorkerBookings().subscribe({
      next: (data: any) => {
        
        this.bookingsAsWorker = data.bookings;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    });
    this.bookingService.getClientsBookings().subscribe({
      next: (data: any) => {
        
        this.bookingsAsClient = data;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    });
  }

  getStatusClass(status: string): string {
  return status.toLowerCase().replace(/\s+/g, '-');   // pl. "elfogadásra vár" → "elfogadásra-vár"
}

  
  statusSelected(booking_id: string, status: string) {
    if (status === 'elutasítva') {
      if (!confirm('Biztosan elutasítod ezt a felkérést?')) {
        return;
      }
    }

    this.bookingService.updateBookingStatus(booking_id, status).subscribe({
      next: () => {
        this.loadBookings();
      },
      error: (err) => {
        console.error('Státusz módosítás hiba', err);
        alert('Nem sikerült módosítani a státuszt');
      }
    });
  }

  rateBookingThenDelete(service_id:any,index:number,booking:any){
    if (booking.selectedRating) return;
    booking.selectedRating = index+1;
    this.selectedRating = index +1 ;
    this.serviceService.writeReview(service_id,this.selectedRating.toString()).subscribe({
      next:()=>{
        this.bookingService.deleteBooking(booking.booking_id).subscribe({
          next:()=>{
            confirm("sikeres értékelés és törlés");
            this.loadBookings();
          },
          error:(err)=>{
            console.error(err);
          }
        })
      },
      error:(err)=>{
        confirm("sikertelen értékelés: " + err);
        console.error(err);
      }
    });

  }

}
