import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from './dto/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url = "localhost:3000/doctors"
  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get<Doctor[]>(this.url);
  }
}
