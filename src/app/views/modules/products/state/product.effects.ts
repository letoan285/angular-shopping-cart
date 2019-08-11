import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { Observable, of} from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Product } from '../product.model';
import * as productActions from './product.actions';
import { Action } from '@ngrx/store';


export class ProductEffect {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ){}

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.LoadProducts>(
            productActions.ProductActionTypes.LOAD_PRODUCTS
        ),
        mergeMap((action: productActions.LoadProducts) => this.productService.getProducts().pipe(
            map((products: Product[]) => new productActions.LoadProductsSuccess(products)
            ),
            catchError( err => of( new productActions.LoadProductsFail(err) ))
        ))
    );
    @Effect()
    loadProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.LoadProduct>(productActions.ProductActionTypes.LOAD_PRODUCT),
        mergeMap((action: productActions.LoadProduct) => this.productService.getProduct(action.payload).pipe(
            map((product: Product) => new productActions.LoadProductSuccess(product),
            catchError(err => of(new productActions.LoadProductFail(err)))
            )
        ))
    );

    @Effect()
    createProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.CreateProduct>(productActions.ProductActionTypes.CREATE_PRODUCT),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) => this.productService.createProduct(product).pipe(
            map((newProduct: Product) => new productActions.CreateProductSuccess(newProduct), 
            catchError(err => of(new productActions.CreateProductFail(err))))
        ))
    );

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.DeleteProduct>(
            productActions.ProductActionTypes.DELETE_PRODUCT
        ),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((id: number) => this.productService.deleteProduct(id).pipe(
            map(() => new productActions.DeletProductSuccess(id)),
            catchError(err => of(new productActions.DeleteProductFail(err)))
        ))
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.UpdateProduct>(productActions.ProductActionTypes.UPDATE_PRODUCT),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) => this.productService.updateProduct(product).pipe(
            map((updatedProduct: Product) => {
                return new productActions.UpdateProductSuccess({
                    id: updatedProduct.id,
                    changes: updatedProduct
                })
            }),
            catchError(err => of(new productActions.UpdateProductFail(err)))
        ))
    );
}
