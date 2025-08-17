// Interfaz para productos de la API (catálogo general)
export interface Producto {
  id: number;
  title: string;
  description: string;
  price: number;
  count: number;
  image: string;
}

// Interfaz para experiencias espaciales (productos personalizados)
export interface ExperienciaEspacial {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  duracion: string;
}
