import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/modelos/producto.model';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {
  @Input() visible = false;
  @Input() producto!: Producto;
  @Output() guardar = new EventEmitter<Producto>();
  @Output() cancelar = new EventEmitter<void>();


}
