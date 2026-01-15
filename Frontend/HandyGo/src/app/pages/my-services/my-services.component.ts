import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent implements OnInit{
  myServices: any[] = [];

  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.service.getMyServices().subscribe({
      next: (data: any) => {
        this.myServices = data;
      },
      error: (error: any) => {
        console.error('Error fetching my services:', error);
      }
    });
  }
}
