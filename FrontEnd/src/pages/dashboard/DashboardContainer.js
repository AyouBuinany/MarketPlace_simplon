import { getAllProducts, applyFilters } from '../../redux/action/productAction'
import { connect } from 'react-redux'
import DashboardTest from './DashboardTest'
const mapStoreToProps = state => ({
  products: state.product.products,
  error:state.product.error
})
const mapDispatchToProps = dispatch => ({
  getAllProducts: ()=>dispatch(getAllProducts()),
  applyFilters:(filter_string)=>dispatch(applyFilters(filter_string))
})

export default connect(mapStoreToProps, mapDispatchToProps)(DashboardTest)