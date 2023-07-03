import { Injectable } from '@angular/core';
import { Saldo } from './saldo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';        

@Injectable({
  providedIn: 'root'//no es necesario importarlo en app.module.ts (providedIn: 'root')
})
export class SaldoService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/api';   

  postSaldo(saldo: Saldo): Observable<Saldo> {
    return this.http.post<Saldo>(`${this.url}/saldo`, saldo);
  }
}
