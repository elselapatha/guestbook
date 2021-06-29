import { Record, RecordResponse } from '../shared/models/record.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private records = new BehaviorSubject<RecordResponse[]>([])
  constructor(private http: HttpClient) { }

  get dataSource (): Observable<RecordResponse[]> {
    return this.records.asObservable()
  }

  clearData () {
    this.records.next([])
  }
  loadData (): Observable<RecordResponse[] | void> {
    return this.http.get<RecordResponse[]>(`${environment.API_URL}/records`, this.headers())
      .pipe(
        map((res: RecordResponse[]) => {
          this.records.next(this.records.getValue().concat(res))
          return res
        }),
        catchError((error) => this.handleErrors(error))
      )
  }
  postRecord (data: Record): Observable<RecordResponse> {
    return this.http.post<RecordResponse>(`${environment.API_URL}/records`, data, this.headers())
      .pipe(
        map((res: RecordResponse) => {
          this.records.next(this.records.getValue().concat([res]))
          return res
        }),
        catchError((error) => this.handleErrors(error))
      )
  }

  patchRecord (id: string, message: string): Observable<RecordResponse> {
    return this.http.patch<RecordResponse>(`${environment.API_URL}/records/${id}`, { message }, this.headers())
      .pipe(
        map((res: RecordResponse) => {
          res && this.records.next(this.records.getValue().map(e => e._id === id ? { ...e, message: res.message } : e))
          return res
        }),
        catchError((error) => this.handleErrors(error))
      )
  }

  deleteRecord (id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.API_URL}/records/${id}`, this.headers())
      .pipe(
        map((res: boolean) => {
          res && this.records.next(this.records.getValue().filter(e => e._id !== id))
          return res
        }),
        catchError((error) => this.handleErrors(error))
      )
  }

  private handleErrors (error: Error): Observable<never> {
    let message = ''
    if (error) {
      message = `Error: code ${error.message}`
    }
    window.alert(message)
    return throwError(message)
  }

  private headers (): { headers: HttpHeaders } {
    const token = localStorage.getItem('token')

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return { headers }
  }
}
