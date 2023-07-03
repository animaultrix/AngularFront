import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../services/usuario//usuario';
import { Saldo } from 'src/app/services/saldo/saldo';
import { SaldoService } from 'src/app/services/saldo/saldo.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit{

  nombre?: string = '';
  usuario: Usuario = new Usuario();
  

  constructor( private usuarioService: UsuarioService, private saldoService: SaldoService ) {  }
  
  ngOnInit() {
    this.name();
    console.log('nombre:'+this.nombre);
  }
  //saldo: Saldo = new Saldo();
  saldo: Saldo = {
    cantidad: 0,
    concepto: '',
    usuarioCorreo: 'yo@gmail.com'
  };

  public postIngreso(): any {
    // Para ingresos, la cantidad debe ser positiva
    this.saldo.cantidad = Math.abs(this.saldo.cantidad || 0);
    this.postSaldo();
    this.saldo = { cantidad: 0, concepto: '', usuarioCorreo: 'yo@gmail.com' };
  }
  
  public postGasto(): any {
    // Para gastos, la cantidad debe ser negativa
    this.saldo.cantidad = -Math.abs(this.saldo.cantidad || 0);
    this.postSaldo();    
    this.saldo = { cantidad: 0, concepto: '', usuarioCorreo: 'yo@gmail.com' };
  }
  
  public postSaldo(): any{
    this.saldoService.postSaldo(this.saldo).subscribe(
      saldo => {     
        console.log('saldo:', saldo);
      },
      error => {
        console.error('There was an error!', error);
      }
    );    
  }
  onInputCantidad(event: any): void {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, ''); // Solo permite números y el punto decimal
    value = value.replace(/(.*\..*)\./g, '$1'); // No permite más de un punto decimal
    value = value.replace(/^0+(?=[1-9.])/g, ''); // Elimina los ceros iniciales, excepto antes de un punto decimal
    
    // Si el valor ingresado es un número con más de dos decimales
    if (parseFloat(value) && parseFloat(value) % 1 != 0) {
      // Conserva el número con más de dos decimales en la vista
      // Pero conserva solo dos decimales en el modelo
      this.saldo.cantidad = parseFloat(parseFloat(value).toFixed(2));
    } else {
      this.saldo.cantidad = parseFloat(value);
    }
  }
  
  onKeyPressCantidad(event: any): void {
    const pattern = /[0-9\.]/; // solo números y punto decimal
    let inputChar = String.fromCharCode(event.charCode);
  
    // Comprobación de si se ha introducido un punto decimal más de una vez
    if(inputChar === '.' && this.saldo.cantidad.toString().includes('.')){
      event.preventDefault();
    }
    
    // Solo permite la entrada de caracteres numéricos y punto decimal
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onKeyUpCantidad(event: any): void {
    let value = event.target.value;
  
    // Elimina cualquier carácter que no sea un número o un punto
    value = value.replace(/[^0-9.]/g, '');
  
    // No permite más de un punto decimal
    value = value.replace(/(.*\..*)\./g, '$1');
  
    // Elimina cualquier '0' seguido por un número (para evitar '05', '007', etc.)
    value = value.replace(/^0(?=[1-9])/g, '');
  
    // Limita a dos decimales
    value = value.replace(/(\.\d{2})./g, '$1');
  
    this.saldo.cantidad = value ? parseFloat(value) : 0;
  }
  
  onBlurCantidad(): void {
    // Si el valor ingresado es un número con más de dos decimales
    if (this.saldo.cantidad && this.saldo.cantidad % 1 != 0) {
      // Redondea el número a dos decimales
      this.saldo.cantidad = parseFloat(this.saldo.cantidad.toFixed(2));
    }
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
