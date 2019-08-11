import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Store } from '@ngrx/store';

import { Product } from '../product.model';
import * as fromProduct from '../state/product.reducers';
import * as productAction from '../state/product.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromProduct.AppState>
  ) { }



  ngOnInit() {
    this.initProductForm();
  }



  initProductForm(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      slug: [''],
      description: [''],
      price: [''],
      category_id: ['']
    });
  }


  createProduct(){
    const newProduct = {
      name: this.productForm.get('name').value,
      slug: this.productForm.get('slug').value,
      price: this.productForm.get('price').value,
      image: 'noimage.png',
      description: this.productForm.get('description').value,
      category_id: this.productForm.get('category_id').value,
      status: 1
    }
    console.log(newProduct);
    this.store.dispatch(new productAction.CreateProduct(newProduct));
    this.productForm.reset();
    setTimeout(() => {
      this.router.navigate(['/products/list']);
    });
    
  }

}
