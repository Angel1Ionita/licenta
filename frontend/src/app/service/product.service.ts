import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/products";

  constructor(private http: HttpClient) { }

  // getProducts() {//getProducts(specialization:Specialization)
  //   return this.http.get<{ id: number, name: string }[]>(this.url);
  // }

  //to do - get products for each specialization
}
