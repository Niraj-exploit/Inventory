import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AllUserService {
  users: any = [];
  constructor(private http: HttpClient, private authService: AuthService) {}
  private apiUrl = 'http://localhost:3000/users/';

    getHeadersWithToken(): HttpHeaders {
    const token = this.getAuthToken();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  listUsers() {
    const headers = this.getHeadersWithToken()
    console.log(headers);
    
    return this.http.get<any>(`${this.apiUrl}all-user`, {headers});
  }

  private getAuthToken(): string | null {
    // Replace this method with your logic to get the authentication token
    // e.g., you can retrieve it from local storage or a cookie
    const token = localStorage.getItem('token');
    return token;
  }
  deleteUser(userId: number): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.delete(`${this.apiUrl}delete-user/${userId}`, {
      headers
    });
  }
  // user(user: any) {
  //   const headers = this.getHeadersWithToken();
  //   return this.http.post(`${this.apiUrl}register`, user, { headers });
  // }
  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}register`, user);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const headers = this.getHeadersWithToken();
    const url = `${this.apiUrl}update-user/${userId}`;


    return this.http
      .put<any>(url, userData, {headers}) 
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

