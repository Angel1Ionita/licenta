import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule, NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  carousel= [
    
  ]

  testimonials = [
    {
      image: "https://medikali.ro/storage/specialties/1661766810-oftalmologia_gallery1.jpg",
      text: "Doctorul m-a ajutat cu prescripția ochelarilor - Andrei"
    },
    {
      image: "https://familyclinic.ro/wp-content/uploads/2022/09/cardiologie.jpg",
      text: "Mulțumesc medicului pentru ajutorul oferit pentru tratarea durerii ochilor - Ioana"
    },
    {
      image: "https://www.aria.com.ro/clinic/static/produse/general.jpg",
      text: "Mulțumesc medicului pentru ajutorul oferit - Maria"
    }
  ]
}
