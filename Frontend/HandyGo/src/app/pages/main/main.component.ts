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

  filterOpen: boolean = false;
  categories: string[] = ["Mind","Otthon & Kert", "Javítás", "Kreatív", "Tech", "Életmód", "Szállítás", "egyéb"];
  
  selectedCategory: string = 'Mind';
  distance: number | undefined = undefined;
  priceRange: [number, number] = [NaN, Infinity];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getServices({"category": (this.selectedCategory === 'Mind' ? '':this.selectedCategory), "distance": (this.distance == null?undefined:this.distance) , priceRange: (this.priceRange[1] == Infinity || Number.isNaN(this.priceRange[1]) || Number.isNaN(this.priceRange[0]) ? [this.priceRange[0],1000000000] : this.priceRange)}).subscribe({
      next: (data: any) => {
        data = data.filter((item : any) => item.worker_id !== localStorage.getItem("userId"));
        
        this.services = data;
      },
      error: (error: any) => {
        console.error('Error fetching services:', error);
      }
    })
  }

  onCategorySelect(category: string): void{
    if (category === 'Mind'){
      this.selectedCategory = '';
      return;
    }
    this.selectedCategory = category;
  }
  
  resetFilters():void{
    this.selectedCategory = 'Mind';
    this.distance = undefined;
    this.priceRange = [NaN, Infinity];
    this.ngOnInit();
  }

  onServiceSelect(serviceId: number): void {
    console.log('Selected service ID:', serviceId);
    this.router.navigate(['/services', serviceId]);
  }
}
