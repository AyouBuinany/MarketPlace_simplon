import React, { Component } from 'react'
import HeaderContainer from '../../components/header/headerContainer'
import Product from './components/Product'
import Filter from './components/Filter'
import styles from './stylesheets/dashboard.module.sass'


export class DashboardTest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    componentDidMount() {
        if (!this.props.products) {
          this.props.getAllProducts()
        }
      }
    
    render() {
        const { products,error, applyFilters } = this.props
        console.log("error")
        console.log(error)
      
        return (
            
                <div className={styles.outbox}>
        {/* Header */}
        <HeaderContainer />
        <div className={styles.box}>
         
          {/* filter */}
          <div className={styles.filter}>
            <Filter
              applyFilters={applyFilters}
            />
          </div>
          {/* products */}
          <div className={`row ${styles.products}`}>
            {products && !error ? products.map(p =>
              <div
                key={p.title}
                className={`col-6 col-sm-4 col-md-4 col-lg-3 my-3 `}
                onClick={() => this.props.history.push(`/product-overview/${p._id}`)}>
                <Product
                  title={p.title}
                  price={`$${p.price} CAD`}
                  image={p.image}
                />
              </div>
           )
           :
           <div>
      {error && error.message}
           </div> 
           }
          </div>
        </div>
      </div>
        )
    }
}


export default DashboardTest
