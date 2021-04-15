import React, { Component } from 'react'
import styles from './stylesheets/productOverview.module.sass'
import { Button } from 'react-bootstrap'
import Header from '../../components/header/headerContainer'
import jumpTo from '../../modules/Navigation'

export default class ProductOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
  componentDidMount() {
  
    this.props.getProduct(this.props.location.pathname.split("/").slice(-1)[0])
  }


  addToBag = () => {
    this.props.postCart(
       this.props.location.pathname.split("/").slice(-1)[0]
    ).then(res => {
     jumpTo('/bag')
    })
  }

  render() {
    return (
      <div className={styles.outbox}>
        <Header />
        {this.props.product &&
          <div className={styles.content_box}>
            <div className={styles.content}>
              {/* left image */}
              <div className={styles.image}>
                <img src={ this.props.product.image} alt="" />
              </div>
              {/* right content box */}
              <div className={styles.context_outbox}>
                <div className={styles.context}>
                  {/* top descriptions */}
                  <div className={styles.title}>
                    {this.props.product.title}
                  </div>
                  <div className={styles.description}>
                    {this.props.product.description}
                  </div>
                  <div className={styles.price}>
                    ${this.props.product.price} CAD
                  </div>
                  
                  <div className={styles.btns}>
                    <Button className={styles.btn} onClick={this.addToBag} variant="outline-primary">Add to Bag</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
