import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../../../modelos/cliente.model';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html'
})
export class VerClienteComponent {
  @Input() cliente!: Cliente | null;
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();

}
