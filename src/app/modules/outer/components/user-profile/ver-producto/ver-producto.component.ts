import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../../interfaces/producto.model';


@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html'
})
export class VerProductoComponent {
  @Input() producto!: Producto | null;
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
}
