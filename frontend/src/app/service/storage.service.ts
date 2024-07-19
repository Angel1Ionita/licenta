import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  getItem(key: string) {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string) {
    if (this.isBrowser)
      localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    if (this.isBrowser)
      localStorage.removeItem(key);
  }

}
