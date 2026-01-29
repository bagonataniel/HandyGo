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

  categories: string[] = ["---","Otthon & Kert", "Javítás", "Kreatív", "Tech", "Életmód", "Szállítás", "egyéb"];
  
  selectedCategory: string = '';
  distance: number | undefined = undefined;
  priceRange: [number, number] = [1, 1000000000];

  ngOnInit(): void {
    this.service.getServices({"category": this.selectedCategory, "distance": this.distance , priceRange: this.priceRange}).subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.services = data;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    })
  }

  onCategorySelect(category: string): void{
    if (category === '---'){
      this.selectedCategory = '';
      return;
    }
    this.selectedCategory = category;
  }
  
  resetFilters():void{
    this.selectedCategory = '';
    this.distance = undefined;
    this.priceRange = [1, 1000000000];
    this.ngOnInit();
  }

  onServiceSelect(serviceId: number): void {
    // Handle service selection, e.g., navigate to service details page
    console.log('Selected service ID:', serviceId);
    this.router.navigate(['/services', serviceId]);
  }
}
