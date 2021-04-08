import {connect } from 'react-redux'
import Login from './Login'
import {postToken} from '../../redux/action/tokenAction'
// const mapDispatchToProps= dispatch=>({
//   postToken: ()=> dispatch(postToken())
// })

const mapDispatchToProps= {
    postToken
  }
const mapStoreToProps=state=>({
  user_token:state.token.user_token,
  login_loading:state.token.token_loading,
  login_error:state.token.error
})

export default connect(mapStoreToProps,mapDispatchToProps)(Login)