import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '../dto/medic';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  url: string = "http://localhost:8080/hospitals";
  constructor(private http:HttpClient) { }

  getHospitals() {
    return this.http.get<Hospital[]>(this.url);
  }

}
