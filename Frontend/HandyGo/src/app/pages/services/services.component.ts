import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  id:string = '';
  serviceData: any;

  constructor(private service: ServiceService, private bookingService: BookingService){}

  ngOnInit(): void {
    this.id = window.location.pathname.split('/').pop() || '';
    this.service.getServiceById(this.id).subscribe({
      next: (data: any) => {
        this.serviceData = data;
        console.log(this.serviceData);
        
      },
      error: (error: any) => {
        console.error('Error fetching service by ID:', error);
      }
    })
  }

  bookService(): void {
    if (this.serviceData) {
      this.bookingService.createBooking(this.serviceData.id).subscribe({
        next: (data: any) => {
          console.log('Service booked successfully:', data);
        },
        error: (error: any) => {
          console.log('Error booking service:', error.error.error);
        }
      })
      console.log('Booking service:', this.serviceData);
    }
  }
}
