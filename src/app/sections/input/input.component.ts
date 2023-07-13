import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../services/usuario//usuario';
import { Saldo } from 'src/app/services/saldo/saldo';
import { SaldoService } from 'src/app/services/saldo/saldo.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";//Formularios reactivos

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {



  nombre?: string = '';
  usuario: Usuario = new Usuario();
  form!: FormGroup;

  //saldo: Saldo = new Saldo();
  saldo: Saldo = {
    cantidad: 0,
    concepto: '',
    usuarioCorreo: 'yo@gmail.com'
  };



  constructor(
    private usuarioService: UsuarioService,
    private saldoService: SaldoService,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit() {
    this.form = this.formBuilder.group({
      // El primer validador es un validador predefinido que verifica si el valor cumple con el patrón regular especificado.
      // El segundo validador es un método personalizado definido más adelante en esta clase.
      saldo: [0, [Validators.pattern(/^[0-9]*\.?[0-9]*$/), this.decimalValidator]],
      concepto: ['']
    });

    // La propiedad valueChanges es un observable que emite un evento cada vez que cambia el valor del campo saldo
    this.form.get('saldo')?.valueChanges.subscribe(value => {
      // Utilizamos { emitEvent: false } para evitar que este cambio de valor dispare otro evento de cambio de valor,
      // lo que resultaría en un bucle infinito de eventos.
      if (typeof value === 'string' && value.startsWith('.')) {
        this.form.patchValue({ saldo: '0' + value }, { emitEvent: false });
      }
    });
  }

  decimalValidator(control: FormControl) {
    const value = control.value;
    // Comprobamos si el valor es una cadena y si tiene más de un punto decimal
    if (typeof value === 'string' && (value.match(/\./g) || []).length > 1) {
      return { multipleDecimals: true };
    }
    // Si no se ha detectado ningún error, devolvemos null, lo que indica que la validación ha pasado.
    return null;
  }

  public postIngreso(): any {
    // Para ingresos, la cantidad debe ser positiva
    this.saldo.cantidad = Math.abs(parseFloat(this.form.get('saldo')?.value || '0'));
    this.saldo.concepto = this.form.get('concepto')?.value || '';
    this.postSaldo();
    this.form.patchValue({ saldo: '0', concepto: '' }, { emitEvent: false });
  }

  public postGasto(): any {
    // Para gastos, la cantidad debe ser negativa
    this.saldo.cantidad = -Math.abs(parseFloat(this.form.get('saldo')?.value || '0'));
    this.saldo.concepto = this.form.get('concepto')?.value || '';
    this.postSaldo();
    this.form.patchValue({ saldo: '0', concepto: '' }, { emitEvent: false });
  }

  public postSaldo(): any {
    this.saldoService.postSaldo(this.saldo).subscribe({
      next: (saldo) => {
        console.log('saldo:', saldo);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
      complete: () => {
        console.log('Complete!');
      }
    });
  }

  onKeyPressCantidad(event: any): void {
    const pattern = /[0-9\.]/; // solo números y punto decimal
    let value = event.target.value;//campo justo cuando salta el evento
    let inputChar = String.fromCharCode(event.charCode);

    // Comprobación de si se ha introducido un punto decimal más de una vez
    this.saldo.cantidad.toString().includes('.')
    if (inputChar === '.' && value.includes('.')) {
      event.preventDefault();
    }

    // Solo permite la entrada de caracteres numéricos y punto decimal
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    const pattern = /[0-9.]*/; // Permite números y punto decimal
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // Si el carácter no es numérico o un punto, previene la entrada
      event.preventDefault();
    }
  }

  onBlurCantidad(): void {
    let value = this.form.get('saldo')?.value;

    if (typeof value === 'string' && value.endsWith('.')) {
      this.form.patchValue({ saldo: value + '0' }, { emitEvent: false });
    }
  }

  public name(): any {
    this.usuarioService.getUsuario('yo@gmail.com').subscribe(
      usuario => {
        this.nombre = usuario.nombreUsuario
        console.log('usuario:', usuario);
      }
    );
  }
}
