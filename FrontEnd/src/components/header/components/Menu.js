import React from 'react'
import styles from '../stylesheets/menu.module.sass'
import DropList from './DropList'
import jumpTo from '../../../modules/Navigation'
import { NavDropdown } from 'react-bootstrap'
export default function Menu({
  categorys,
  getProductsByCategory,
  getAllProducts
}) {
  console.log("categorys");
  console.log(categorys)
  return (
  
    <div className={styles.outbox}>
      {/* lists */}
      <div className={`${styles.lists}`}>
        {/* categorys */}
        <div className={styles.tag}>
        <NavDropdown title="Categorys"  >
        {categorys && categorys.map(c =>
            
        <NavDropdown.Item 
        onClick={()=>{
           getProductsByCategory(c.name)
          jumpTo('/dashboard')
        }}  
        key={c._id}>{c.name}
        </NavDropdown.Item>
      )
    
}
    </NavDropdown>

            
          </div>
        {/* )} */}
      </div>
      {/* all product */}
      <div className={styles.tag}
        onClick={() => {
          getAllProducts()
          jumpTo('/dashboard')
        }}
      >
        All Product
      </div>
    </div>
  )
}
