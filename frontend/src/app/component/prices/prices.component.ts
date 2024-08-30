import { Component } from '@angular/core';
import { PriceCardComponent } from '../price-card/price-card.component';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [PriceCardComponent],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css'
})
export class PricesComponent {

}
