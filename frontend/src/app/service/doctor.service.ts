import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medic } from '../dto/medic';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url = "http://localhost:8080/medics"
  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get<Medic[]>(this.url);
  }

  getDoctorById(id: string) {
    return this.http.get<Medic>(`${this.url}/${id}`);
  }
}
