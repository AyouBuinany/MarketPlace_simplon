
import React, { Component } from 'react'
import styles from "./stylesheets/Login.module.sass";
import jumpTo from '../../modules/Navigation'
import {
    validateExistence,
    validateLength,
    validateLowerCase,
    validateUpperCase
  } from './utils/validation'
import {connect } from 'react-redux'
import {verifyPassword} from '../../redux/action/signinAction'

 class ValiderPassword extends Component {
constructor(props) {

    super(props)

    this.state = {
         

    }

   
    

    this.inputText = {}
    this.INPUT_CONFIG = [
        {
       
        name: "password",
        validations: [validateExistence, validateLength(6, 15), validateLowerCase, validateUpperCase]
        }
    
      ]
     for (const input of this.INPUT_CONFIG) {
       this.state[input.name] = { errorMsg: '' }
      this.inputText[input.name] = ''
     }
}

 //validate input when blur
 handleBlur = (e, validResult) => {
    console.log(this.INPUT_CONFIG);
    const name = e.target.name
    this.inputText[name] = e.target.value
  
    if (!validResult.isValid) {
      this.setState({
        [name]: { errorMsg: validResult.errorMsg }
      })
    } else {
      this.setState({
        [name]: { errorMsg: '' }
      })
    }
  }

    handleFocus = (e) => {
        const name = e.target.name
        this.setState({
          [name]: { errorMsg: '' }
        })
      }

 validate = (validations, val) => {
        if (validations) {
          for (const validation of validations) {  
            if (!validation.check(val)) {
              return {
                isValid: false,
                errorMsg: validation.errMsg
              }
            }
          }
        }
        return { isValid: true }
      }



       //submit actions
       handleClick = () => {
 //validate all input 
 let canSubmit = true
// console.log(this.INPUT_CONFIG);
  for (const input of this.INPUT_CONFIG) {

    if (!input.validations) continue
   
    for (const v of input.validations) {
     let checkResult = v.check(this.inputText[input.name])
   
     canSubmit =canSubmit && checkResult;

     if (!checkResult) {
       this.setState({
         [input.name]: { errorMsg: v.errMsg }
       })
       break
     }
   }
 }
 if (!canSubmit) {
   console.log('valid fail');
   return
 }
 const { password } = this.inputText;
 console.log('this.props.params');
 let {token}=this.props.match.params
 console.log(token);
  this.props.verifyPassword(token, password)
     .then(res => {
        console.log("res");
       console.log(res);
      // jumpTo('/dashboard')
    return res
   })
     .catch(error => {
       
       alert(this.props.verify_error.error.message);
       return error
     })
}

  

    render() {
        return (
            <div className={styles.outbox,styles.body_page}>
            <div className={styles.box}>
      <div className={styles.outbox}>
      <div className={styles.logo}> Market place</div>
      <div className={styles.title_style}>Vendeur</div>
      <div className={styles.title_style}>Change Password</div>
      <div>
      </div>
      <div className={styles.border_style}></div>
      <div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="Password">Password</label>
    </div>
    
    <div className={styles.input}>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onBlur={(e) => this.handleBlur(e, this.validate(this.INPUT_CONFIG[0].validations, e.target.value))}
        onFocus={(e)=>this.handleFocus(e)}
      />
    </div>
    <div className={styles.errMsg}>
      {this.state["password"] && this.state["password"].errorMsg }
    </div>
      </div>
      
    <div className={styles.outStyle}>
      <input type="submit" value="Save" className={styles.btnStyle} onClick={this.handleClick}/>
    </div>
    
      </div>
      </div>
      </div>
  )
}

 
}


const mapDispatchToProps= {
    verifyPassword
}
const mapStoreToProps=state=>({
verify_error:state.verify.error
})
export default connect(mapStoreToProps,mapDispatchToProps)(ValiderPassword)

