import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GenerBooksService {

  constructor(private _http: HttpClient) {  }

  getGenerBooks(getGenerBooksApi):Observable<any>{
    return this._http.get<any>(getGenerBooksApi)
    .pipe(
      catchError((error)=>{
        return throwError(error);
      }));
  }
}
