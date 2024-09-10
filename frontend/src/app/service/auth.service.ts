import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAdminRegister } from '../dto/userAdminRegister';
import { UserRegister } from '../dto/userRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  performLogin(email: string, password: string) {
    return this.http.post<{ email: string, role: string }>(`${this.baseUrl}/login`, { email, password });
  }

  performLogout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }

  performRegister(user: UserRegister) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  performRegisterAdmin(user: UserAdminRegister) {
    return this.http.post(`${this.baseUrl}/admin/register`, user);
  }

  getUserInfo() {
    return this.http.get<{ email: string, role: string }>(`${this.baseUrl}/user`);
  }

  requestPasswordReset(email: { email: string }) {
    return this.http.post(`${this.baseUrl}/forgot-password`, email);
  }

  finishPasswordReset(request: { token: string, new_password: string }) {
    return this.http.post(`${this.baseUrl}/reset-password`, request)
  }




}
