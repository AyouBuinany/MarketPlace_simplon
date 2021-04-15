import React from 'react'
import { Button } from 'react-bootstrap'
import Header from '../../components/header/headerContainer'
import TableCommande from './components/Table'
import styles from "./stylesheets/Profile.module.sass";
function Profile(props) {
    let {commandes,
        getCommandeByUser
    
    }= props
    return (
        <div className={styles.outbox}>
        <Header commandes={commandes}/>

        <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.title.concat(" my-3")}>
           List Commandes
          </div>
        <div className={styles.table}>
            <TableCommande commandes={commandes}></TableCommande>
            </div>
            </div></div>

      </div>
    )
}

export default Profile
