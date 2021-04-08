import React, { Component } from 'react'
import styles from './stylesheets/header.module.sass'
import UserHeader from './components/UserHeader'
import Menu from './components/Menu'
import jumpTo from '../../modules/Navigation'



export default class Header extends Component {
  constructor(props) {
    super(props)
  }
 
  render() {
    const { user_token,
      categorys,
      getProductsByCategory,
      getAllProducts } = this.props
    return (
      <div className={styles.outbox}>
          {/* top user header */}
          <div className={styles.user_header}>
            <UserHeader
              user_token={user_token}
            />
          </div>
          {/* menu header */}
          <div className={styles.content}>
            <div className={styles.left}>
              {/* logo */}
              <div className={styles.logo}
                onClick={() => {
                  getAllProducts()
                  jumpTo('/dashboard')
                }}
              >
                Market Place
              </div>
            </div>
            <div className={styles.mid}>
              <Menu
                categorys={categorys}
                getProductsByCategory={getProductsByCategory}
                getAllProducts={getAllProducts}
              />
            </div>
          
          </div>
  
      </div >
    )
  }
}



