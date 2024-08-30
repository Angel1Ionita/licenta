import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getUserRole(): string {
    return JSON.parse(localStorage.getItem('role')!);
  }

}
