import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { IService } from './IService';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CountryService implements IService {
  constructor(private http: HttpClient) {}

  getCountry(): Observable<any> {
    return this.http.get(
      'https://restcountries.com/v3.1/all?fields=name,capital,currencies'
    );
  }

  getTranslation(country: string) {
    return this.http.get(
      'https://restcountries.com/v3.1/translation/' + country
    );
  }
}
