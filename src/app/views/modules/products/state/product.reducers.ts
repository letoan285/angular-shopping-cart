import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../product.model';
import * as fromRoot from '../../../../state/appState';
import * as productAction from '../state/product.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState extends EntityState<Product> {
    selectedProductId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    products: ProductState;
}
export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();


export const defaultProduct: ProductState = {
    ids: [],
    entities: {},
    selectedProductId: null,
    loading: false,
    loaded: false,
    error: ''
}


export const initialState = productAdapter.getInitialState(defaultProduct);
export function productReducer(state = initialState, action: productAction.Action): ProductState {
    switch(action.type){
        case productAction.ProductActionTypes.LOAD_PRODUCTS_SUCCESS: {
            return productAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }
        case productAction.ProductActionTypes.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                entities: {},
                loading: false,
                loaded: false
            }
        }
        default: {
            return state;
        }
    }
}


const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(getProductFeatureState, productAdapter.getSelectors().selectAll);

export const getProductsLoading = createSelector(getProductFeatureState, (state: ProductState) => state.loading);
export const getProductsLoaded = createSelector(getProductFeatureState, (state: ProductState) => state.loaded);

export const getError = createSelector(getProductFeatureState, (state: ProductState) => state.error);

export const getCurrentProductId =  createSelector(getProductFeatureState, (state: ProductState) => state.selectedProductId);

export const getCurrentProduct = createSelector(getProductFeatureState, (state: ProductState) => state.entities[state.selectedProductId]);