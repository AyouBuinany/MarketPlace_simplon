import React, { Component } from 'react'
import Checkbox from './Checkbox'
import styles from '../stylesheets/filter.module.sass'
import generateFilterString from '../utils/generateFilterString'


export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.FILTER_CONFIG = {
      order: ['Ascending', 'Descending'],
      price: ['Less Than $12', '$12 - $25', '$25 - $30', '$30 - $49', 'Greater Than $59']
    }
    this.initialState = {}
    this.state = this.initialState
  }
  handleChange = (e, category) => {
    let tagName = ''
    let isChecked = false
 
      // handle input checkbox
      tagName = e.target.name.toUpperCase()
      isChecked = e.target.checked

    this.setState(prevState => {
      //add category value to array
      if (isChecked) {
        //user can only select one order
        if (category === 'order') {
          return {
            //order : Ascending

            [category]: [tagName]
          }
        }
       
        return {
          // price : 12-25,25-30
          [category]: [...prevState[category] || [], tagName]
        }

      } else {
   
        //remove category value from array
       
        const new_prop_array = prevState[category].filter(n => n !== tagName)
        return {
          [category]: new_prop_array
        }
      }
    },() => this.props.applyFilters(generateFilterString(this.state)))
  }

  
  handleCloseTag = (category, name) => {
    this.setState(prevState => {
      const new_prop_array = prevState[category].filter(n => n !== name)
      return {
        [category]: new_prop_array
      }
    }, () => this.props.applyFilters(generateFilterString(this.state)))
  }
  clearAllFilter = () => {
    this.setState({ order: [], price: []
    }, () => this.props.applyFilters(''))
  }
  render() {
    return (
      <div>
          <div className={styles.outbox}>
            <div className={styles.box}>
              <div className={styles.title}>
                FILTERS
          <div className={styles.title_border}></div>
              </div>
              <div className={styles.content}>
                {/* order */}
                <div className={styles.block}>
                  <div className={styles.sub_title}>
                    ORDER
                  </div>
                  {this.FILTER_CONFIG['order'].map(n =>
                    <Checkbox
                      key={n}
                      onChange={this.handleChange}
                      name={n}
                      category='order'
                      isChecked={this.state['order'] && this.state['order'].includes(n.toUpperCase()) || false}
                    />
                  )}
                </div>
                
                {/* price */}
                <div className={styles.block}>
                  <div className={styles.sub_title}>
                    PRICE
                  </div>
                  {this.FILTER_CONFIG['price'].map(n =>
                    <Checkbox
                      key={n}
                      onChange={this.handleChange}
                      name={n}
                      category='price'
                      isChecked={this.state['price'] && this.state['price'].includes(n.toUpperCase()) || false}
                    />
                  )}
                </div>
              </div>
              <div className={styles.clear_btn} onClick={this.clearAllFilter}>
                <button>Clear All</button>
              </div>
              {/* filter tags */}
              <div className={styles.tags}>
                {
                  Object.keys(this.state).map(c => (
                    this.state[c] && this.state[c].map(n => (
                      <div key={n} className={styles.tag}>
                        <div className={styles.tag_content}>
                          {n}
                        </div>
                        <div
                          className={styles.tag_close}
                          onClick={() => this.handleCloseTag(c, n)}
                        >
                          x
                      </div>
                      </div>
                    ))))}
              </div>
            </div>
          </div>
      </div >
    )
  }
}

