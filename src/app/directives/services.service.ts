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
  public getServices(): Observable<Services[]> {
    return this.http.get<Services[]>(`${this.apiServerUrl}/services`);
  }
}
