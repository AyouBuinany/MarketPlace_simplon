import React from 'react'
import styles from '../stylesheets/userHeader.module.sass'
import { NavDropdown } from 'react-bootstrap'
import Auth from '../../../modules/Auth'
import jumpTo from '../../../modules/Navigation'
import { BiCartAlt } from "react-icons/bi";

export default function UserHeader({ user_token,cart}) {

var key, count = 0;

// Check if every key has its own property
for (key in cart.items ) {
    if (cart.items.hasOwnProperty(key))

        // If the key is found, add it to the total length
     count++;
}


  return (
    <div className={styles.outbox}>
      <div className={styles.tag} onClick={() => jumpTo('/bag')}>
        <b>CART</b> 
      {(cart && Object.keys(cart).length > 0) ? 
      
            <p >
            <BiCartAlt ></BiCartAlt> {count}
            </p>
         :
    <BiCartAlt ></BiCartAlt>
    }
        
       
      </div>
      {(user_token && Object.keys(user_token).length > 0)
        ?
        <div className={styles.loggout}>
          <NavDropdown title={`hello, ${user_token.user_name}`}>
            <NavDropdown.Item onClick={Auth.logout} href='/'>
              logout
             </NavDropdown.Item>
          
          <NavDropdown.Item  href='/profile'>
              Profile
             </NavDropdown.Item>
             </NavDropdown>
        </div>
        : 
        <div className={styles.loggout}>
          <div className={styles.login} onClick={() => jumpTo('/login')}>
            Login
        </div>
        </div>
      }
    </div>
  )
}
