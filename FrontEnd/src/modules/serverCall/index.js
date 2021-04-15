import Auth from '../Auth'
import jumpTo from '../Navigation'
import axios from 'axios'
import qs from 'qs' //qs string => obj( = qs.parse()) or obj=>String (= qs.stringfy())
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
  return axios({
    method: 'POST',
    url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    auth: {
      username: 'AWL2jx41LoLFwsYZ6QXJR2bXweZsmC2WU23_5vKP0Lm-IeuVEUPjX4KiFsfsopkLemG_o0jmr9Fhymgy',
      password: 'EPcbm-8yN4aP00UciTLOM4R_FBKqqcwR7OYq-vdkpDfaszOCbiUmwK6-akj57R4yTMQzKctElbPbLpC-'
    },
    data: qs.stringify({ "grant_type": "client_credentials" })
  })
 }