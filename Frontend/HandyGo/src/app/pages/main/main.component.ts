import { Component, inject, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  services: any[] = [];
  router: Router = inject(Router);

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getServices().subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.services = data;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    })
  }

  onServiceSelect(serviceId: number): void {
    // Handle service selection, e.g., navigate to service details page
    console.log('Selected service ID:', serviceId);
    this.router.navigate(['/services', serviceId]);
  }
}
