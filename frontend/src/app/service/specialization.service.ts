import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialization } from '../dto/medic';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private url = "http://localhost:8080/specializations";

  constructor(private http: HttpClient) { }

  getSpecializations() {
    return this.http.get<Specialization[]>(this.url);
  }
}
