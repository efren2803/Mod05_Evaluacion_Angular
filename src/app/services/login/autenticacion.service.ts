import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { errLogin } from './errLogin';
import { token } from './token';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  uriHost: string;
  uriLogin: string;

  eLogin:errLogin = {
    err:""
  };

  constructor(private http: HttpClient) {
    this.uriHost = "http://localhost:8080/api";
    this.uriLogin = "";
  }

  login(credentials: { nombreUsuario: string; password: string }): Observable<any> {
    this.uriLogin = this.uriHost + "/autenticacion";

    const body = credentials;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    console.log("Servicio Login");
    console.log(credentials);

    return this.http.post<token>(this.uriLogin, body, { headers })
      .pipe(
        catchError((err, caugth) => {
          return this.procesarErrorAgregaPersonal(err, caugth)
        })
      );
  }

  private procesarErrorAgregaPersonal(err: any, caugth: Observable<token>): any {
    this.eLogin.err = err.message;
    return of(this.eLogin);
  }
}
