import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { AppUserRole } from './app-user-role';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SERVICES } from '../services/services-list';
import { PelucheItem } from '../models/pelucheitem';
import { PelucheTop } from '../models/peluchetop';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  public userName: any = localStorage.getItem('user');
  public isAuth: boolean = false;
  public securityObject: AppUserAuth = new AppUserAuth();

  public constructor(private http: HttpClient, private router: Router) {}

  public checkAuth(): boolean {
    const user = localStorage.getItem('user');
    if (user == null || user == '') return false;
    else return true;
  }

  public login(userData: AppUser): Observable<string> {
    this.resetSecurityObject();
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<string>(
      SERVICES.API_BaseUrl + SERVICES.LOGIN_Authenticate,
      body,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  public register(userData: AppUser): Observable<string> {
    this.resetSecurityObject();
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<string>(
      SERVICES.API_BaseUrl + SERVICES.LOGIN_Register,
      body,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }

  public order(peluche: PelucheItem): Observable<string> {
    let token = localStorage.getItem('bearerToken');
    const body = JSON.stringify(peluche);

    if (token != null) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Authorization', token);
      return this.http.post<string>(
        SERVICES.API_BaseUrl + SERVICES.PELUCHE_order,
        body,
        { headers: headers, responseType: 'text' as 'json' }
      );
    }
    return new Observable<string>();
  }

  public getSales(page: number, skip: number): Observable<Array<PelucheItem>> {
    let token = localStorage.getItem('bearerToken');
    if (token != null) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<Array<PelucheItem>>(
        SERVICES.API_BaseUrl +
          SERVICES.PELUCHE_getAllSale +
          'page=' +
          page +
          '&skip=' +
          skip,
        { headers: headers, responseType: 'json' }
      );
    }
    return new Observable<Array<PelucheItem>>();
  }

  public setSale(id: string, sale: boolean): Observable<string> {
    let token = localStorage.getItem('bearerToken');
    if (token != null) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<string>(
        SERVICES.API_BaseUrl +
          SERVICES.PELUCHE_setSale +
          'id=' +
          id +
          '&sale=' +
          sale,
        { headers: headers, responseType: 'json' }
      );
    }
    return new Observable<string>();
  }

  public buy(id: string): Observable<string> {
    let token = localStorage.getItem('bearerToken');
    if (token != null) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<string>(
        SERVICES.API_BaseUrl + SERVICES.PELUCHE_buy + 'id=' + id,
        { headers: headers, responseType: 'json' }
      );
    }
    return new Observable<string>();
  }

  public getTop(): Observable<Array<PelucheTop>> {
    return this.http.get<Array<PelucheTop>>(
      SERVICES.API_BaseUrl + SERVICES.PELUCHE_top
    );
  }

  public getTotalSale(): Observable<number> {
    return this.http.get<number>(
      SERVICES.API_BaseUrl + SERVICES.PELUCHE_getTotalSale
    );
  }

  public getTotalMy(): Observable<number> {
    let token = localStorage.getItem('bearerToken');
    if (token != null) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<number>(
        SERVICES.API_BaseUrl + SERVICES.PELUCHE_myTotal,
        {
          headers: headers,
        }
      );
    }
    return new Observable<number>();
  }

  public delete(id: string): Observable<string> {
    let token = localStorage.getItem('bearerToken');
    if (token != null) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.delete<string>(
        SERVICES.API_BaseUrl + SERVICES.PELUCHE_deletePeluche + id,
        {
          headers: headers,
        }
      );
    }
    return new Observable<string>();
  }

  public getAllByUser(
    page: number,
    skip: number
  ): Observable<Array<PelucheItem>> {
    let token = localStorage.getItem('bearerToken');
    if (token != null) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.get<Array<PelucheItem>>(
        SERVICES.API_BaseUrl +
          SERVICES.PELUCHE_getAllByUser +
          '?' +
          'page=' +
          page +
          '&skip=' +
          skip,
        { headers: headers, responseType: 'json' }
      );
    }
    return new Observable<Array<PelucheItem>>();
  }

  public changePass(pass: string): Observable<boolean> {
    let user: AppUser = new AppUser();
    user.Username = this.userName;
    user.UserPassword = pass;
    const body = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearerToken'),
    });
    return this.http.post<boolean>(
      SERVICES.API_BaseUrl + SERVICES.USER_ChangePassword,
      body,
      { headers: headers }
    );
  }

  public logout(): void {
    this.resetSecurityObject();
  }

  private resetSecurityObject(): void {
    localStorage.setItem('role', '');
    localStorage.setItem('user', '');
    localStorage.setItem('bearerToken', '');
  }
}
