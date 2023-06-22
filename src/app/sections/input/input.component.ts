import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../usuarios/usuario.service';
import { Usuario } from '../../usuarios/usuario';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit{

  nombre?: string = '';
  usuario: Usuario = new Usuario();
  

  constructor( private usuarioService: UsuarioService ) {  }
  
  ngOnInit() {
    this.name();
    console.log('nombre:'+this.nombre);
  }

  public name(): any{
    this.usuarioService.getUsuario('yo@gmail.com').subscribe(
      usuario => {
      this.nombre = usuario.nombreUsuario
      console.log('usuario:', usuario);
      }
    );
    
  }


}
