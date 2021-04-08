import serverCall from '../../modules/serverCall'

export const signinClient=(firstName,lastName,email,password,verifyPassword)=>dispatch=>{
  dispatch({
    type: POST_SIGNIN_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:'/api/users/register',
    data:{
      firstName,lastName,email,password,verifyPassword
    }
  })
  .then(res=>{
    dispatch({
      type:POST_SIGNIN_SUCCESS,
      payload:res
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type:POST_SIGNIN_FAIL,
      payload:{error}
    })
 
    throw error
  })
}
export const signinVendeur=(firstName,lastName,email,password,verifyPassword,adress,city,numberPhone)=>dispatch=>{
  dispatch({
    type: POST_SIGNIN_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:'/api/vendeurs/register',
    data:{
      firstName,lastName,email,password,verifyPassword,adress,city,numberPhone
    }
  })
  .then(res=>{
    dispatch({
      type:POST_SIGNIN_SUCCESS,
      payload:res
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type:POST_SIGNIN_FAIL,
      payload:{error}
    })
    throw error
  })
}

export const verifyPassword =(token , password)=>dispatch=>{
  dispatch({
    type: POST_PASSWORD_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:`/api/vendeurs/verify/${token}`,
    data:{
      password
    }
  }).then(response=>{
    dispatch({
      type:POST_PASSWORD_SUCCESS,
      payload:response
    })
    return response
  }).catch(err=>{
    dispatch({
      type:POST_PASSWORD_FAIL,
      payload:{err}
    })
    throw err
  })
}
export const POST_SIGNIN_BEGIN='POST_SIGNIN_BEGIN'
export const POST_SIGNIN_SUCCESS='POST_SIGNIN_SUCCESS'
export const POST_SIGNIN_FAIL='POST_SIGNIN_FAIL'
//
export const POST_PASSWORD_BEGIN='POST_PASSWORD_BEGIN'
export const POST_PASSWORD_SUCCESS='POST_PASSWORD_SUCCESS'
export const POST_PASSWORD_FAIL='POST_PASSWORD_FAIL'