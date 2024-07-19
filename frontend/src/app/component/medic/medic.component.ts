import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { Medic } from '../../dto/medic';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-medic',
  standalone: true,
  imports: [AsyncPipe, MatCardModule],
  templateUrl: './medic.component.html',
  styleUrl: './medic.component.css'
})
export class MedicComponent implements OnInit {
  medic?: Medic;

  constructor(
    private medicService: DoctorService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.medicService.getDoctorById(id!).subscribe(data => {
      this.medic = data;
      if (this.medic == null) {
        this.router.navigate(['']);
      }
    });

  }

  stringify(str: any): string {
    return JSON.stringify(str);
  }

  getImage(image: string | null) {
    return image ? `http://localhost:8080/images/${image}.webp` : "assets/images/default.webp";
  }


}
