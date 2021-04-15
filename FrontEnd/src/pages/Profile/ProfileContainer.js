import { connect } from 'react-redux'
import Profile from './Profile'
import {getCommandeByUser,getCommandes} from '../../redux/action/commandeAction'

const mapStoreToProps=state=>({
  commandes:state.commandes.commandes
})
const mapDispatchToProps=dispatch=>({
    getCommandeByUser:dispatch(getCommandeByUser()),
    getCommandes:dispatch(getCommandes())
})

export default connect(mapStoreToProps,mapDispatchToProps)(Profile)