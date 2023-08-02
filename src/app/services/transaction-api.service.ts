import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionsResponse } from '../models/transactions-response';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {
  // The following line is used to get the apiBaseUrl from the environment file
  private baseURL = environment.apiBaseUrl;

  constructor(
    // HttpClient will be used to make the http requests
    private http: HttpClient
  ) { }

  // This function is used to fetch the transactions from the backend, query is used for the pagination and sorting
  getTransactions(query: string = ""): Observable<TransactionsResponse> {
    // The following line is used to make the http request to the backend to fetch the transactions
    return this.http.get<TransactionsResponse>(this.baseURL + '/transaction/all' + query);
  }
}
