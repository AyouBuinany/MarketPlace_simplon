import Register from './Register'
import { connect } from 'react-redux'
import { signinClient,signinVendeur } from '../../redux/action/signinAction'

const mapDispatchToProps = {
  signinClient,
  signinVendeur
}
const mapStoreToProps = state => ({
  signin_loading: state.signin.signin_loading,
  signin_error: state.signin.error
})

export default connect(mapStoreToProps, mapDispatchToProps)(Register)
