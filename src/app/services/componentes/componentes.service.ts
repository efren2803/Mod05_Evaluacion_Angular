import { Injectable } from '@angular/core';
import { errComponente } from './errComponente';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Componente } from './Componente';

@Injectable({
  providedIn: 'root'
})
export class ComponentesService {
  uriHost: string;
  uriListarComponentes: string;

  errListComponente: errComponente[] = [{
    err: ""
  }];

  constructor(private http: HttpClient) {
    this.uriHost = "http://localhost:8080/api/componentes";
    this.uriListarComponentes = "";
  }

  getListaComponentes(): Observable<any> {
    this.uriListarComponentes = this.uriHost + "/listar";
    
    return this.http.get<Componente[]>(this.uriListarComponentes)
      .pipe(
        catchError((err, caugth) => {
          return this.procesarErrorListarComponentes(err, caugth)
        })
      );
  }

  private procesarErrorListarComponentes(err: any, caugth: Observable<Componente[]>): any {
    this.errListComponente[0].err = err.message;
    return of(this.errListComponente);
  }
}
