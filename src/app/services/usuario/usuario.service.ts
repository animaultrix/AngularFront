import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
@Injectable()
export class UsuarioService {
 
    url: string = 'http://localhost:8080/api';    

    constructor(private http: HttpClient ) {}

    getUsuario(correo: string): Observable <Usuario> {        
        return this.http.get<Usuario>(`${this.url}/usuario/${correo}`);
    }
    setUsuarios <Usuario> (usuario: Usuario) {
        return this.http.post(`${this.url}/usuario`, usuario);
    }
}