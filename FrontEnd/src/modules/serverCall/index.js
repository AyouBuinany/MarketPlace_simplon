import Auth from '../Auth'
import jumpTo from '../Navigation'
import axios from 'axios'
import qs from 'qs'
//import paypalConfig from '../../configs/paypalConfig'

 const URL = 'http://localhost:3000'

const serverCall = (config) => {
  //header authorization
  if (Auth.user_token) {
    let token = Auth.getToken()
    config.headers = {
      "auth-token": token
    }
  }
  config.baseURL = URL
  return axios(config)
}
export default serverCall

export const login = (email, password,route) => {
  const body =
  {
    "credential": {
      "email": email,
      "password": password
    }
  }
  return serverCall({
    method: 'POST',
    url: `/api/${route}/login`,
    data: body
  })
  
    .then(res => {
      Auth.setUserToken(res.data.user_token)
      return res
    })
}

export const getPaypalToken = () => {
//   return axios({
//     method: 'POST',
//     url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
//     headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     auth: {
//       username: paypalConfig.username,
//       password: paypalConfig.password
//     },
//     data: qs.stringify({ "grant_type": "client_credentials" })
//   })
 }