import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-creator',
  templateUrl: './service-creator.component.html',
  styleUrl: './service-creator.component.css'
})
export class ServiceCreatorComponent {
  newService: any = {
    title: '',
    description: '',
    category: '',
    price: 0,
    location: ''
  };

  categories: string[] = ["Otthon & Kert", "Javítás", "Kreatív", "Tech", "Életmód", "Szállítás", "egyéb"];

  constructor(
    private service: ServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onCategorySelect(category: string): void {
    this.newService.category = category;
  }

  getValidity(): boolean {
    return (
      this.newService.title.trim() !== '' &&
      this.newService.description.trim() !== '' &&
      this.newService.category !== '' &&
      this.newService.price >= 0 &&
      this.newService.location.trim() !== ''
    );
  }

  SubmitService(): void {
    if (!this.getValidity()) {
      this.snackBar.open('Kérlek tölts ki minden mezőt helyesen!', 'Bezár', {
        duration: 4000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    this.service.createService(this.newService).subscribe({
      next: (data: any) => {
        this.snackBar.open('Sikeres szolgáltatás létrehozás!', 'Bezár', {
          duration: 4000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/my-services']);
      },
      error: (error: any) => {
        let msg = 'Hiba történt a létrehozás során.';
        if (error.status === 404) {
          msg = 'Nem helyes helyadatot adott meg.';
        }
        this.snackBar.open(msg, 'Bezár', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        console.error('Error creating service:', error);
      }
    });
  }
}