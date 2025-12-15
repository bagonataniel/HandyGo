import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  services: any[] = [];

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
}
