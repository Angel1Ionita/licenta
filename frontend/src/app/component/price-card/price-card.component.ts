import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SpecializationService } from '../../service/specialization.service';
import { Observable } from 'rxjs';
import { Specialization } from '../../dto/medic';
import { AsyncPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-price-card',
  standalone: true,
  imports: [MatExpansionModule, MatDividerModule, AsyncPipe],
  templateUrl: './price-card.component.html',
  styleUrl: './price-card.component.css'
})
export class PriceCardComponent implements OnInit {
  specializations?: Observable<Specialization[]>
  constructor(private specializationService: SpecializationService) {

  }
  ngOnInit(): void {
    this.specializations = this.specializationService.getSpecializations();
  }
}
