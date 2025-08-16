import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../interfaces/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlApi = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlApi);
  }



}
