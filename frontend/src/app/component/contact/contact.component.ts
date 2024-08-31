import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { tileLayer, latLng, marker, Marker, LatLng } from 'leaflet';
import { HospitalService } from '../../service/hospital.service';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavigationComponent, LeafletModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  layers?: Marker<any>[];
  options?: any;
  centers: Map<string, number[]> = new Map();
  city?: string;

  constructor(
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.queryParamMap.get('city') || 'Bucharest';
    this.initializeCoordMap();
    this.hospitalService.getHospitals().subscribe(
      hospitals => {
        //let city: string = hospitals[0].city;
        let city: string = this.city!;
        this.layers = hospitals.filter(hospital => hospital.city == city).map(hospital => marker([hospital.lat, hospital.lng]).bindPopup(hospital.name));
        this.options = {
          layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 17 })
          ],
          zoom: 11,
          center: this.getMapCenter(city)
        };
      }
    );

  }

  getMapCenter(city: string): LatLng {
    let centerCoords = this.centers.get(city)!;
    return latLng(centerCoords[0], centerCoords[1]);
  }

  initializeCoordMap(): void {
    this.centers.set('Bucharest', [44.4325, 26.103889]);
    this.centers.set('Brasov', [45.666667, 25.616667]);
    this.centers.set('Sibiu', [45.792778, 24.151944]);
    this.centers.set('Cluj-Napoca', [46.766667, 23.583333]);
  }

  onCityChange() {
    //refresh component
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/contact'], { queryParams: { city: this.city } });
    });
  }

}
