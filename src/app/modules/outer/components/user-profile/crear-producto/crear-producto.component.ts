import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Producto } from '../../../../interfaces/producto.model';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent {
  @Input() visible = false;
  @Input() producto!: Producto;
  @Output() guardar = new EventEmitter<Producto>();
  @Output() cancelar = new EventEmitter<void>();
}
