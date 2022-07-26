import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Services } from '../store/services';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //Get all services
  public getServices(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/services`);
  }

  //add services
  public addServices(service: Services): Observable<Services> {
    return this.http.post<Services>(`${this.apiServerUrl}/services`, service);
  }

  public updateServices(id: Number, service: Services): Observable<Services> {
    return this.http.put<Services>(`${this.apiServerUrl}/services/${id}`, service);
  }

  public deleteServices(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/services/${id}`);
  }
}
