import {
  GET_ALL_PRODUCTS_BEGIN,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_PRODUCT_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCTS_BY_CATEGORY_BEGIN,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAIL,
  APPLY_FILTERS_BEGIN,
  APPLY_FILTERS_SUCCESS,
  APPLY_FILTERS_FAIL,
} from '../action/productAction'

const initialState = {
  products: null,
  product: null,
  loading: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data.products
      }
    case GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data
      }
      //Gest Product
    case GET_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.data.product
      }
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data
      }
      // get Product by category
    case GET_PRODUCTS_BY_CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data.products
      }
    case GET_PRODUCTS_BY_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data
      }
  //  Filter
    case APPLY_FILTERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case APPLY_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data.products
      }
    case APPLY_FILTERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data
      }
    default:
      return state
  }
}
