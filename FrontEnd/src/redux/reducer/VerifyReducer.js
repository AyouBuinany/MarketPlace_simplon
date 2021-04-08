import {
    POST_PASSWORD_BEGIN,
    POST_PASSWORD_SUCCESS,
    POST_PASSWORD_FAIL
  } from '../action/signinAction'
  
  const initialState = {
    verify_loading: false,
    error: {},
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case POST_PASSWORD_BEGIN:
        return {
          ...state,
          verify_loading: true
        }
      case POST_PASSWORD_SUCCESS:
        return {
          ...state,
          verify_loading: false,
        }
      case POST_PASSWORD_FAIL:
        return {
          ...state,
          verify_loading: false,
          error: action.payload.err.response.data
        }
      default:
        return state
    }
  }