import serverCall from '../../modules/serverCall'
import Auth from '../../modules/Auth';
export const getCommandes=()=>dispatch=>{
  dispatch({
    type:GET_COMMANDES_BEGIN,
  })
  return serverCall({
    method:'GET',
    url:'/api/commandes'
  })
  .then(res=>{
    dispatch({
      type:GET_COMMANDES_SUCCESS,
      payload:res
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type:GET_COMMMANDES_FAIL,
      payload:{error}
    })
    return error
  })
}
//
export const getCommandeByUser=()=>dispatch=>{
    let userId = Auth.getUserId()
    dispatch({
      type:GET_COMMANDEBYUSER_BEGIN,
    })
    return serverCall({
      method:'GET',
      url:`/api/commandes/${userId}`
    })
    .then(res=>{
      dispatch({
        type:GET_COMMANDEBYUSER_SUCCESS,
        payload:res
      })
      return res
    })
    .catch(error=>{
      dispatch({
        type:GET_COMMANDEBYUSER_FAIL,
        payload:{error}
      })
      return error
    })
  }

export const GET_COMMANDES_BEGIN = 'GET_COMMANDES_BEGIN'
export const GET_COMMANDES_SUCCESS='GET_COMMANDES_SUCCESS'
export const GET_COMMMANDES_FAIL='GET_COMMMANDES_FAIL'

export const GET_COMMANDEBYUSER_BEGIN = 'GET_COMMANDEBYUSER_BEGIN'
export const GET_COMMANDEBYUSER_SUCCESS='GET_COMMANDEBYUSER_SUCCESS'
export const GET_COMMANDEBYUSER_FAIL='GET_COMMANDEBYUSER_FAIL'