import {connect} from 'react-redux'
import Header from './Header'
import {getCategorys} from '../../redux/action/CategoryAction'
import {getProductsByCategory,getAllProducts} from '../../redux/action/productAction'


const mapStoreToProps=state=>({
  user_token:state.token.user_token,
  categorys:state.category.categorys,
})

const mapDispatchToProps=dispatch=>({
  getCategorys:dispatch(getCategorys()),
  getProductsByCategory:(c)=>dispatch(getProductsByCategory(c)),
  getAllProducts:()=>dispatch(getAllProducts())
})

export default connect(mapStoreToProps,mapDispatchToProps)(Header)