import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { UsersService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  myServices: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  userName: string = 'Betöltés...';

  constructor(
    private service: ServiceService,
    private usersService: UsersService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserName();
    this.loadMyServices();
  }

  loadUserName() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.userName = 'Felhasználó';
      return;
    }

    this.usersService.getUserDetails(userId).subscribe({
      next: (data: any) => {
        const user = data.user || data;
        this.userName = user.name || 'Felhasználó';
      },
      error: () => {
        this.userName = 'Felhasználó';
      }
    });
  }

  loadMyServices() {
    this.isLoading = true;

    this.service.getMyServices().subscribe({
      next: (data: any) => {
        this.myServices = data || [];
        this.myServices.forEach(service => {
          if (service.latitude && service.longitude) {
            this.getCityFromCoords(service, service.latitude, service.longitude);
          } else {
            service.city = 'Nincs hely megadva';
          }
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Nem sikerült betölteni a szolgáltatásaidat.';
        this.isLoading = false;
        this.snackBar.open('Hiba történt a betöltés során', 'Bezár', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        console.error('Hiba:', err);
      }
    });
  }

  getCityFromCoords(service: any, lat: number, lon: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

    this.http.get(url, {
    }).subscribe({
      next: (data: any) => {
        const address = data?.address || {};
        service.city = address.city || address.town || address.village || address.hamlet || 'Ismeretlen város';
      },
      error: () => {
        service.city = 'Hiba a város lekérdezésekor';
      }
    });
  }

  deleteService(serviceId: string) {
    const snackRef = this.snackBar.open('Biztosan törölni szeretnéd ezt a szolgáltatást?', 'Igen', {
      duration: 6000,
      panelClass: ['warn-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    snackRef.onAction().subscribe(() => {
      this.service.deleteService(serviceId).subscribe({
        next: () => {
          this.myServices = this.myServices.filter(s => s.id !== serviceId);
          this.snackBar.open('Szolgáltatás sikeresen törölve', 'Bezár', {
            duration: 4000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.error('Törlési hiba:', err);
          this.snackBar.open('Nem sikerült törölni a szolgáltatást', 'Bezár', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    });
  }
}