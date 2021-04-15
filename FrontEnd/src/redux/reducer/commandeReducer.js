import {
    GET_COMMANDES_BEGIN,
    GET_COMMANDES_SUCCESS,
    GET_COMMMANDES_FAIL,
    GET_COMMANDEBYUSER_BEGIN,
    GET_COMMANDEBYUSER_SUCCESS,
    GET_COMMANDEBYUSER_FAIL
  } from '../action/commandeAction'
  
  const initialState = {
    loading: false,
    commandes: null,
    error: null,
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_COMMANDES_BEGIN:
        return {
          loading: true,
          error: null
        }
      case GET_COMMANDES_SUCCESS:
        return {
          loading: false,
          commandes: action.payload.data.commandes
        }
      case GET_COMMMANDES_FAIL:
        return {
          loading: false,
          error: action.payload.error.response.data
        }

        case GET_COMMANDEBYUSER_BEGIN:
            return {
              loading: true,
              error: null
            }
          case GET_COMMANDEBYUSER_SUCCESS:
            return {
              loading: false,
              commandes : action.payload.data.commandes
            }
          case GET_COMMANDEBYUSER_FAIL:
            return {
              loading: false,
              error: action.payload.error.response.data
            }
      default:
        return state
    }
  }