import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { Medic } from '../../dto/medic';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NavigationComponent, RouterModule],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent implements OnInit {
  medics?: Medic[];

  constructor(
    private doctorService: DoctorService,
  ) { }

  ngOnInit(): void {    
    this.doctorService.getDoctors().subscribe(data => this.medics=data);
  }

  getImage(image: string | null){
      return image ? `http://localhost:8080/images/${image}.webp` : "assets/images/default.webp";
  }


}
