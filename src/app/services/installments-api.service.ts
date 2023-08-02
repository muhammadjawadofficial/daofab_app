import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstallmentsResponse } from '../models/installments-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstallmentsApiService {
  // The following line is used to get the apiBaseUrl from the environment file
  private baseURL = environment.apiBaseUrl;

  constructor(
    // HttpClient will be used to make the http requests
    private http: HttpClient
  ) { }

  // This function is used to fetch the installments from the backend
  getInstallments(transactionId: number): Observable<InstallmentsResponse> {
    // The following line is used to make the http request to the backend to fetch the installments
    return this.http.get<InstallmentsResponse>(this.baseURL + '/payments/' + transactionId);
  }
}
