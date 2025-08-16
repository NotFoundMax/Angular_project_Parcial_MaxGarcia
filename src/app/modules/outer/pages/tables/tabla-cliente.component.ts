// Componente para mostrar la tabla de clientes con acciones
import { Component } from '@angular/core';
import { Cliente } from '../../../../interfaces/interfaceCustomer';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.css']
})

export class TablaClienteComponent {

  // Lista de clientes de ejemplo
  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan.perez@email.com',
      telefono: '123456789',
      fechaNacimiento: '1990-01-01'
    },
    {
      id: 2,
      nombre: 'Ana',
      apellido: 'García',
      correo: 'ana.garcia@email.com',
      telefono: '987654321',
      fechaNacimiento: '1985-05-15'
    }
  ];

  // Variables para los modales
  mostrarModalVer = false;
  mostrarModalEditar = false;
  mostrarModalCrear = false;
  nuevoCliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    fechaNacimiento: ''
  };

  clienteSeleccionado: Cliente | null = null;
  clienteEditando: Cliente = {
    id: 0, nombre: '', apellido: '', correo: '', telefono: '', fechaNacimiento: ''
  };

   // Abrir modal de crear cliente
  abrirModalCrear() {
    // Asignar un nuevo id (puedes mejorar esto según tu lógica)
    const maxId = this.clientes.length > 0 ? Math.max(...this.clientes.map(c => c.id)) : 0;
    this.nuevoCliente = {
      id: maxId + 1,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      fechaNacimiento: ''
    };
    this.mostrarModalCrear = true;
  }

  // Guardar nuevo cliente
  guardarNuevoCliente() {
    this.clientes.push({ ...this.nuevoCliente });
    this.mostrarModalCrear = false;
  }

  // Cancelar creación
  cancelarNuevoCliente() {
    this.mostrarModalCrear = false;
  }


  // Abrir modal de ver
  verCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.mostrarModalVer = true;
  }

  // Cerrar modal de ver
  cerrarModalVer() {
    this.mostrarModalVer = false;
    this.clienteSeleccionado = null;
  }

  // Abrir modal de editar
  editarCliente(cliente: Cliente) {
    this.clienteEditando = { ...cliente };
    this.mostrarModalEditar = true;
  }

  // Guardar cambios y cerrar modal de editar
  guardarEdicion() {
    this.clientes = this.clientes.map(c =>
      c.id === this.clienteEditando.id ? { ...this.clienteEditando } : c
    );
    this.mostrarModalEditar = false;
  }

  // Cerrar modal de editar
  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  // Confirmar borrado con SweetAlert2
  borrarCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas borrar a ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientes = this.clientes.filter(c => c.id !== cliente.id);
        Swal.fire('¡Borrado!', 'El cliente ha sido eliminado.', 'success');
      }
    });
  }
}
