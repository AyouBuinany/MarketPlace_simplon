import { connect } from 'react-redux'
import ProductOverview from './ProductOverview'
import {getProduct} from '../../redux/action/productAction'
import {postCart} from '../../redux/action/cartAction'

const mapStoreToProps=state=>({
  product:state.product.product
})
const mapDispatchToProps={
  getProduct,
  postCart
}

export default connect(mapStoreToProps,mapDispatchToProps)(ProductOverview)