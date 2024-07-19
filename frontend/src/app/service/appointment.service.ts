import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentDto, AppointmentResponse, UserAppointmentDto, UserAppointmentResponse } from '../dto/appointmentDto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  createUserAppointment(appointment: UserAppointmentDto) {
    return this.http.post(this.baseUrl + "/user-appointments", appointment);
  }

  createAppointment(appointment: AppointmentDto) {
    return this.http.post(this.baseUrl + "/appointments", appointment);
  }

  getUserAppointmentsByUser() {
    return this.http.get<UserAppointmentResponse[]>(this.baseUrl + "/user-appointments/user")
  }

  getAppointmentsByUser() {
    return this.http.get<AppointmentResponse[]>(this.baseUrl + "/appointments/user");
  }

  getAllUserAppointments() {
    return this.http.get<UserAppointmentResponse[]>(this.baseUrl + "/user-appointments");
  }

  getAllAppointments() {
    return this.http.get<AppointmentResponse[]>(this.baseUrl + "/appointments");
  }


}
