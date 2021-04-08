import serverCall from '../../modules/serverCall'

export const getCategorys=()=>dispatch=>{
  dispatch({
    type:GET_CATEGORYS_BEGIN,
  })
  return serverCall({
    method:'GET',
    url:'/api/category'
  })
  .then(res=>{
    dispatch({
      type:GET_CATEGORYS_SUCCESS,
      payload:res
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type:GET_CATEGORYS_FAIL,
      payload:{error}
    })
    return error
  })
}

export const GET_CATEGORYS_BEGIN = 'GET_CATEGORYS_BEGIN'
export const GET_CATEGORYS_SUCCESS='GET_CATEGORYS_SUCCESS'
export const GET_CATEGORYS_FAIL='GET_CATEGORYS_FAIL'