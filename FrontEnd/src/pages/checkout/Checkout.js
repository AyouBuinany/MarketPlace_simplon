import React, { Component } from 'react'
import styles from './stylesheets/checkout.module.sass'
import CheckoutTable from './components/CheckoutTable'
import Header from '../../components/header/headerContainer'
export default class Checkout extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    if (Object.keys(this.props.cart).length < 1) {
      this.props.getCartByUserId()
  
    } else {
      this.props.getCheckoutUrl(this.props.cart._id)
     
    }
  }
  componentDidUpdate() {
    if (!this.props.url && Object.keys(this.props.cart).length > 1) {
      this.props.getCheckoutUrl(this.props.cart._id)
    }
  }
  render() {
    console.log('url ');
    console.log(this.props.url);
    return (
      <div className={styles.outbox}>
        <Header />
        <div className={styles.box}>
          <div className={styles.content}>
            {/* title */}
            <div className={styles.title}>
              Checkout
            <div className={styles.sub_title}>
                Hi <b>{this.props.name}</b> Please review your items and press the confirm checkout button. You will enter your address information while your paying on PayPal
              </div>
            </div>
            {/* table */}
            {
            Object.keys(this.props.cart).length > 0 &&
              <div>
                <div className={styles.table}>
                  <CheckoutTable
                    items={this.props.cart.items}
                  />
                </div>
                {/* price Total */}
                <div className={styles.prices}>
                <div className={styles.row + ' ' + styles.total}>
        <div >
          Total
       </div>
        <div >
        {this.props.cart.totalPrice}
               </div>
                </div>
              </div>
              </div>
            }
            {/* button */}
            <div className={styles.btn}>
              <button><a  href={this.props.url}>confirm checkout</a></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

