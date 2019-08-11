import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducers';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import * as productAction from '../state/product.actions';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;
  errors$: Observable<String>;
  constructor(private store: Store<fromProduct.AppState>) { 
  
  }

  ngOnInit() {
    this.getProductList();
  }
  public getProductList(){
    this.store.dispatch(new productAction.LoadProducts);
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
 
    this.errors$ = this.store.pipe(select(fromProduct.getError));

  }
  public deleteProduct(product: Product){
    const cf = confirm("Ban co chac chan xoa phan pham nay ?");
    if(cf){
      this.confirmDeleteProduct(product);
    }
  }

  confirmDeleteProduct(product: Product){
    this.store.dispatch(new productAction.DeleteProduct(product.id));
  }

}
