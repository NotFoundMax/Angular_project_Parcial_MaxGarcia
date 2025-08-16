import { Component } from '@angular/core';


@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent {

  mostrar = false;
  tecnologias = ['Angular', 'React', 'Vue'];
  estado = true;
  tamanoTexto = 16;
  toggleEstado() {
    this.estado = !this.estado;
  }
  resaltado = false;
  nombre: string = '';

}
