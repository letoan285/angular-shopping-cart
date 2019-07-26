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
        private productSerice: ProductService
    ){}

    @Effect()
    loadAllProducts$: Observable<Action> = this.actions$.pipe(
        ofType<productActions.LoadProducts>(
            productActions.ProductActionTypes.LOAD_PRODUCTS
        ),
        mergeMap((action: productActions.LoadProducts) => this.productSerice.getProducts().pipe(
            map((products: Product[]) => new productActions.LoadProductsSuccess(products)
            ),
            catchError( err => of( new productActions.LoadProductsFail(err) ))
        ))
    );
}
