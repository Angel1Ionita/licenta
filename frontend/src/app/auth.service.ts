import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAdminRegister } from './dto/userAdminRegister';
import { UserRegister } from './dto/userRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  performLogin(email: String, password: String) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  performLogout() {
    return this.http.get(`${this.baseUrl}/logout`);
  }

  performRegister(user: UserRegister) {
    return this.http.post(`${this.baseUrl}/register`,user);
  }

  performRegisterAdmin(user: UserAdminRegister) {
    return this.http.post(`${this.baseUrl}/admin/register`,user);
  }

  




}
