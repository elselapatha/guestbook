import { User, UserResponse } from '../shared/models/user.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) {
    this.checkToken()
  }

  get isLogged (): Observable<boolean> {
    return this.loggedIn.asObservable()
  }

  login (authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.storeToken(res.token)
          this.loggedIn.next(true)
          return res
        }),
        catchError((error) => this.handleErrors(error))
      )
  }

  logout (): void {
    localStorage.removeItem('token')
    this.loggedIn.next(false)
  }

  register (data: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}/signup`, data)
      .pipe(
        map((res: UserResponse) => {
          this.storeToken(res.token)
          this.loggedIn.next(true)
          return res
        }),
        catchError((error) => this.handleErrors(error))
      )
  }

  private checkToken (): void {
    const token = localStorage.getItem('token')
    if (token) {
      this.loggedIn.next(true)
    } else this.loggedIn.next(false)
    //validate token is expired
  }
  private storeToken (token: string): void {
    localStorage.setItem('token', token)
  }
  private handleErrors (error: Error): Observable<never> {
    let message = ''
    if (error) {
      message = `Error: code ${error.message}`
    }
    window.alert(message)
    return throwError(message)
  }
}
