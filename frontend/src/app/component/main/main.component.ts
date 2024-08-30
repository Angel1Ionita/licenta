import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterOutlet } from '@angular/router';
import { PriceCardComponent } from '../price-card/price-card.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavigationComponent,PriceCardComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
