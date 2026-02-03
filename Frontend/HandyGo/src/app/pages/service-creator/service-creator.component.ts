import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-service-creator',
  templateUrl: './service-creator.component.html',
  styleUrl: './service-creator.component.css'
})
export class ServiceCreatorComponent {
  newService: any = {
    title:'',
    description:'',
    category:'',
    price: 0,
    location: ''
  }

  categories: string[] = ["Otthon & Kert", "Javítás", "Kreatív", "Tech", "Életmód", "Szállítás", "egyéb"];


  constructor(private service: ServiceService, private router: Router){}


  onCategorySelect(category: string): void{
    this.newService.category = category;
  }

  getValidity(): boolean{
    return this.newService.title !== '' && this.newService.description !== '' && this.newService.category !== '' && this.newService.price >= 0 && this.newService.location !== '';
  }

  SubmitService(): void{
    if (!this.getValidity()){
      alert('Kérlek tölts ki minden mezőt helyesen!');
      return;
    }
    console.log(this.newService);
    this.service.createService(this.newService).subscribe({
      next: (data: any) => {
        alert('Sikeres szolgáltatás létrehozás!');
        this.router.navigate(['/my-services']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404){
          alert('Nem helyes helyadatot adott meg.')
        }
        console.error('Error creating service:', error);
      }
    });
  }

}
