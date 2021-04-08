import {
  GET_CATEGORYS_BEGIN,
  GET_CATEGORYS_SUCCESS,
  GET_CATEGORYS_FAIL
} from '../action/CategoryAction'

const initialState = {
  loading: false,
  categorys: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORYS_BEGIN:
      return {
        loading: true,
        error: null
      }
    case GET_CATEGORYS_SUCCESS:
      return {
        loading: false,
        categorys: action.payload.data.categories
      }
    case GET_CATEGORYS_FAIL:
      return {
        loading: false,
        error: action.payload.error.response.data
      }
    default:
      return state
  }
}