import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProduct from '../state/product.reducers';
import { Store } from '@ngrx/store';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  public product$: any = {
    id: '',
    name: '',
    description: '',
    image: '',
    slug: '',
    price: '',
    category_id: '',
    status: ''
  };
  public productForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromProduct.AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    // const {id} = this.activatedRoute.snapshot.params;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      console.log('Product id', id);
      this.getProduct(id);
    });
    
    
    //this.initProductForm();
  }

  initProductForm():void {
    this.productForm = this.formBuilder.group({
      id: [this.product$.id],
      name: [this.product$.name, [Validators.required, Validators.minLength(2)]],
      description: [this.product$.description],
      image: [this.product$.image],
      slug: [this.product$.slug],
      price: [this.product$.price],
      category_id: [this.product$.category_id],
      status: [this.product$.status]
    });    
  }

  public updateProduct(): void {
    const updatedProduct = {
      id: this.product$.id,
      name: this.productForm.get('name').value,
      slug: this.productForm.get('slug').value,
      price: this.productForm.get('price').value,
      image: 'noimage.png',
      description: this.productForm.get('description').value,
      category_id: this.productForm.get('category_id').value,
      status: 1
    }
    this.store.dispatch(new productActions.UpdateProduct(updatedProduct));
    this.productForm.reset();
    setTimeout(() => {
      this.router.navigate(['/products/list']);
    }, 10);
  }

  public getProduct(id: number){
    console.log('get product works');
  
    this.store.dispatch( new productActions.LoadProduct(id));
    const product$ = this.store.select(fromProduct.getCurrentProduct).subscribe(editedProduct => {
      if(editedProduct){
        this.product$ = editedProduct;
      }
      this.initProductForm();
    });
    const error$ = this.store.select(fromProduct.getError);
    // product$.subscribe(editedProduct => {
    //   if(editedProduct){
    //     console.log('product Editd', editedProduct);
    //     this.product$ = editedProduct;
    //   }
    // });
  }

}
