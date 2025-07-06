import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../../modelos/cliente.model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html'
})
export class EditarClienteComponent {
  @Input() visible = false;
  @Input() cliente!: Cliente;
  @Output() guardar = new EventEmitter<Cliente>();
  @Output() cancelar = new EventEmitter<void>();


}
