import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  id:string = '';

  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.id = window.location.pathname.split('/').pop() || '';
    this.service.getServiceById(this.id).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error fetching service by ID:', error);
      }
    })
  }
}
