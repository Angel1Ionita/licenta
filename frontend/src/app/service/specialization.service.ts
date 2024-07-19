import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private url = "http://localhost:8080/specializations";

  constructor(private http: HttpClient) { }

  getSpecializations() {
    return this.http.get<{ id: number, name: string }[]>(this.url);
  }
}
