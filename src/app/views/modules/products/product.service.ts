import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`);
    // return this.http.get<Product[]>('https://jsonplaceholder.typicode.com/posts');
  }
  public getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`);
  }
  public createProduct(){}
  public updateProduct(){}
  public deleteProduct(){}
}
