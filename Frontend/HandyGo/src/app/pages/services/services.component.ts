import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { BookingService } from '../../services/booking.service';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from '../../services/connection.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  id: string = '';
  serviceData: any = null;
  workerName: string = 'Betöltés...';
  workerEmail: string = 'Betöltés...';
  isLoading = true;
  errorMessage: string | null = null;
  worker_id: string = '';
  rating = 0;
  myUserId = localStorage.getItem('userId') || '';

  private _snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private bookingService: BookingService,
    private usersService: UsersService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (!this.id) {
      this.errorMessage = 'Nincs megadva szolgáltatás azonosító.';
      this.isLoading = false;
      return;
    }

    this.loadService(this.id);

  }

  getStars(rating: number, max = 5): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];

    for (let i = 1; i <= max; i++) {
      if (rating >= i) {
        stars.push('full');
      } else if (rating >= i - 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }

    return stars;
  }


  loadService(serviceId: string) {
    this.isLoading = true;
    this.errorMessage = null;

    this.service.getReviews(serviceId).subscribe({
      next: (reviews: any) => {
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
          this.rating = totalRating / reviews.length;
        } else {
          this.rating = 0;
        }
      },
      error: (error: any) => {
        console.error('Error fetching reviews:', error);
        this.rating = 0;
      }
    });

    this.service.getServiceById(serviceId).subscribe({
      next: (data: any) => {
        this.serviceData = data;
        console.log('Szolgáltatás adatok:', this.serviceData);

        if (this.serviceData?.worker_id) {
          this.worker_id = this.serviceData.worker_id;
          this.loadWorkerDetails(this.serviceData.worker_id);
        } else {
          this.workerName = 'Nincs hozzárendelve szolgáltató';
          this.workerEmail = '–';
        }

        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Nem sikerült betölteni a szolgáltatást.';
        this.isLoading = false;
        console.error('Error fetching service by ID:', error);
      }
    });
  }

  loadWorkerDetails(workerId: string) {
    this.usersService.getUserDetails(workerId).subscribe({
      next: (data: any) => {
        const worker = data.user || data;
        this.workerName = worker.name || 'Ismeretlen szolgáltató';
        this.workerEmail = worker.email || 'Email nem elérhető';
      },
      error: () => {
        this.workerName = 'Név nem elérhető';
        this.workerEmail = 'Email nem elérhető';
      }
    });
  }

  bookService(): void {


    this.connectionService.createConnection(this.serviceData.worker_id, this.workerName);
    if (!this.serviceData?.id) {
      this._snackBar.open('❌ Nincs szolgáltatás betöltve.', 'Bezár', { duration: 4000 });
      return;
    }

    this.bookingService.createBooking(this.serviceData.id).subscribe({
      next: (data: any) => {
        this._snackBar.open('✅ Sikeres foglalás! A szolgáltató hamarosan értesül.', 'Bezár', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        console.log('Service booked successfully:', data);
      },
      error: (error: any) => {
        const errorMsg = error.error?.error || 'Ismeretlen hiba';
        this._snackBar.open(`❌ Hiba a foglalás során: ${errorMsg}`, 'Bezár', {
          duration: 6000,
          panelClass: ['error-snackbar']
        });
        console.log('Error booking service:', error);
      }
    });
  }
}