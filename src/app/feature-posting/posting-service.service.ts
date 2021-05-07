import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IDepartmentList, IPostingContent, IPostingList } from './posting.model';
import { catchError } from 'rxjs/operators';

const smartRecuritersURL = 'https://api.smartrecruiters.com/v1/companies/smartrecruiters';
const countriesUrl = 'https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root',
})
export class PostingService {
  constructor(private _httpClient: HttpClient) {}

  getPostingList(countryParam?: string, departmentParam?: string): Observable<IPostingList[]> {
    return this._httpClient
      .get(`${smartRecuritersURL}/postings?country=${countryParam}&department=${departmentParam}`)
      .pipe(catchError((error) => this.throwErrorMessage(error))) as Observable<IPostingList[]>;
  }

  getPostingDescription(postingId?: string): Observable<IPostingContent> {
    return this._httpClient
      .get(`${smartRecuritersURL}/postings/${postingId}`)
      .pipe(catchError((error) => this.throwErrorMessage(error))) as Observable<IPostingContent>;
  }

  getDepartmentList(): Observable<IDepartmentList[]> {
    return this._httpClient
      .get(`${smartRecuritersURL}/departments`)
      .pipe(catchError((error) => this.throwErrorMessage(error))) as Observable<IDepartmentList[]>;
  }

  getCountryList(): Observable<any[]> {
    return this._httpClient.get(countriesUrl).pipe(catchError((error) => this.throwErrorMessage(error))) as Observable<
      any[]
    >;
  }

  private throwErrorMessage(error: any) {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = this.getServerErrorMessage(error);
    }
    return throwError(errorMsg);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found!`;
      }
      case 403: {
        return `Access Denied!`;
      }
      case 500: {
        return `Internal Server Error!`;
      }
      case 400: {
        return `Bad Request!`;
      }
      default: {
        return `Unknown Server Error!`;
      }
    }
  }
}
