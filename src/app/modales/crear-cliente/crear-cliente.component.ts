import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Cliente } from '../../modelos/cliente.model';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent {
  @Input() visible = false;
  @Input() cliente!: Cliente;
  @Output() guardar = new EventEmitter<Cliente>();
  @Output() cancelar = new EventEmitter<void>();
}

