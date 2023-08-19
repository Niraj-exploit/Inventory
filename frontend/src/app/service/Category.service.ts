import { Injectable } from '@angular/core';
import { AllUserService } from './allUser.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories/';
  constructor(
    private allUserService: AllUserService,
    private http: HttpClient
  ) {}
  categroyList() {
    const headers = this.allUserService.getHeadersWithToken();
    return this.http.get<any>(`${this.apiUrl}viewAll`, { headers });
  }
  categroyCreate(addedCategory: any) {
    const headers = this.allUserService.getHeadersWithToken();
    return this.http.post<any>(`${this.apiUrl}create`, addedCategory, { headers });
  }
  
}
