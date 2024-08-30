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

  deleteUserAppointment(id: number) {
    return this.http.delete(this.baseUrl + "/user-appointments/" + id)
  }

  getUserAppointmentsByUser() {
    return this.http.get<UserAppointmentResponse[]>(this.baseUrl + "/user-appointments/user");
  }

  getUserAppointmentsByMedic() {
    return this.http.get<UserAppointmentResponse[]>(this.baseUrl + "/user-appointments/medic");
  }

  getAppointmentsByUser() {
    return this.http.get<AppointmentResponse[]>(this.baseUrl + "/appointments/user");
  }

  getAppointmentsByMedic() {
    return this.http.get<AppointmentResponse[]>(this.baseUrl + "/appointments/medic");
  }

  getAllUserAppointments() {
    return this.http.get<UserAppointmentResponse[]>(this.baseUrl + "/user-appointments");
  }

  getAllAppointments() {
    return this.http.get<AppointmentResponse[]>(this.baseUrl + "/appointments");
  }

  addSummary(id: number, summary: string) {
    return this.http.put(this.baseUrl + "/appointments/summary/" + id, summary);
  }


}
