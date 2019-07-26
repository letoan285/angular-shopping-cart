import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3030/api/products');
  }
  public getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`http://localhost:3030/api/products/${id}`);
  }
  public createProduct(){}
  public updateProduct(){}
  public deleteProduct(){}
}
