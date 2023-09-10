import { Observable } from 'rxjs';

export interface IService {
  getCountry<T>(): Observable<T>;
}
