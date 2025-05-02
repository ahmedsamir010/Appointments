import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API } from '../../../../public/assets/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = API.BASE_URL;
  constructor(private http: HttpClient) {}
  get<T>(endpoint: string, options?: { params?: any }): Observable<T> {
    let httpParams = new HttpParams();

    if (options?.params) {
      for (const key in options.params) {
        if (options.params[key] !== null && options.params[key] !== undefined) {
          httpParams = httpParams.set(key, options.params[key]);
        }
      }
    }

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      params: httpParams,
    });
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }
  update(endpoint: string, data: any, id: number) {
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, data);
  }
  delete(endpoint: string, id: number) {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
