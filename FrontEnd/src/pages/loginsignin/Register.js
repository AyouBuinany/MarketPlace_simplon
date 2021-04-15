import React, { Component } from 'react'
import styles from "./stylesheets/Login.module.sass";
import jumpTo from '../../modules/Navigation'
import {
    validateExistence,
    validateEmail,
    validateLength,
    validateLowerCase,
    validateUpperCase,
    validateNumberPhone
  } from './utils/validation'

export class Register extends Component {
constructor(props) {

    super(props)

    this.state = {
        
    }

    this.inputText = {}
    this.INPUT_CONFIG = [
        {
       
            name: "firstName",
            validations: [validateExistence,validateLength(3, 15,"first Name")]
            },
        {
       
            name: "lastName",
            validations: [validateExistence,validateLength(3, 15,"last Name")]
            },
        {
       
        name: "email",
          validations: [validateExistence, validateEmail]
        },
       {
           name: "password",
          validations: [validateExistence, validateLength(6, 15,"password"), validateLowerCase, validateUpperCase]
        },
        {
          name: "verifyPassword",
          validations: [validateExistence, validateLength(6, 15,"confirmer password"), validateLowerCase, validateUpperCase]
        }
        
      ]
     for (const input of this.INPUT_CONFIG) {
       this.state[input.name] = { errorMsg: '' }
      this.inputText[input.name] = ''
     }
}

 //validate input when blur
 handleBlur = (e, validResult) => {
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
 console.log(this.INPUT_CONFIG);

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

 const {firstName,lastName, email, password,verifyPassword,adress,city,numberPhone,choix } = this.inputText;
if(this.inputText['choix']==='client' || this.inputText['choix']===undefined){
 
this.props.signinClient(firstName,lastName, email, password, verifyPassword)
      .then(res => {
            jumpTo('/login')
          })
          .catch(error => {
             alert(this.props.signin_error.error.message)
            console.log( this.props.signin_error);
            return error
          })
      }
      if(this.inputText['choix']==='vendeur'){
        this.props.signinVendeur(firstName,lastName, email, password, verifyPassword,adress,city,numberPhone)
        .then(res => {
              jumpTo('/login')
            })
            .catch(error => {
              console.log(error);
              alert(error.response.data.error.message)
              return error
            }) 
      }

}

  

    render() {
        return (
            <div className={styles.outbox,styles.body_page}>
            <div className={styles.box}>
      <div className={styles.outbox}>
      <div className={styles.logo}> Market place</div>
      <div className={styles.title_style}>Register</div>
      <div>
        {/* User */}
      <input type='button' onFocus={(e)=>this.handleFocus(e)} 
       name='choix' value='client' 
       onClick={(e)=>{ 
         this.inputText[e.target.name] = e.target.value
       document.getElementById('vendeur').style.display='none';
  
  }}/>
      {/* Seller */}
      <input type="button" name="choix"  value="vendeur" onClick={(e)=>{

      //update attribute de choix 
        this.inputText[e.target.name] = e.target.value;
        // show input adress, city, numberPhone
        document.getElementById('vendeur').style.display='block';
       
      }}/>
      </div>
      <div className={styles.border_style}></div>
      {/* FirstName */}
      <div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="FirstName">First Name</label>
    </div>
    
    <div className={styles.input}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onBlur={(e) => this.handleBlur(e, this.validate(this.INPUT_CONFIG[0].validations, e.target.value))}
        onFocus={(e)=>this.handleFocus(e)}
      />
    </div>
    <div className={styles.errMsg}>
      {this.state["firstName"] && this.state["firstName"].errorMsg }
    </div>
      </div>
{/* Last Name */}
<div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="LastName">Last Name</label>
    </div>
    
    <div className={styles.input}>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onBlur={(e) => this.handleBlur(e, this.validate(this.INPUT_CONFIG[1].validations, e.target.value))}
        onFocus={(e)=>this.handleFocus(e)}
      />
    </div>
    <div className={styles.errMsg}>
      {this.state["lastName"] && this.state["lastName"].errorMsg }
    </div>
      </div>
      {/* Email */}
      <div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="Email">Email</label>
    </div>
    
    <div className={styles.input}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onBlur={(e) => this.handleBlur(e, this.validate(this.INPUT_CONFIG[2].validations, e.target.value))}
        onFocus={(e)=>this.handleFocus(e)}
      />
    </div>
    <div className={styles.errMsg}>
      {this.state["email"] && this.state["email"].errorMsg }
    </div>
      </div>

      {/* Password */}
      <div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="Password">Password</label>
    </div>
    <div className={styles.input}>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onBlur={(e) => this.handleBlur(e, this.validate(this.INPUT_CONFIG[3].validations, e.target.value))}
        onFocus={(e)=>this.handleFocus(e)}
      />
    </div>
    <div className={styles.errMsg}>
      {this.state["password"] && this.state["password"].errorMsg }
    </div>
    </div>
    {/*  */}

     {/* verifyPassword */}
     <div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="verifyPassword">confirmer Password</label>
    </div>
    <div className={styles.input}>
      <input
        type="password"
        name="verifyPassword"
        placeholder="verify Password"
        onBlur={(e) => this.handleBlur(e, this.validate(this.INPUT_CONFIG[4].validations, e.target.value))}
        onFocus={(e)=>this.handleFocus(e)}
      />
    </div>
    <div className={styles.errMsg}>
      {this.state["verifyPassword"] && this.state["verifyPassword"].errorMsg }
    </div>
    </div>
    {/*  */}

<div className={styles.outboxForm} id='vendeur' style={{display:'none'}}>
  {/* adress */}
<div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="Adress">Adress</label>
    </div>
    
    <div className={styles.input}>
      <input
        type="text"
        name="adress"
        placeholder="Adress"
        onBlur={(e) => this.inputText[e.target.name] = e.target.value}
      />
    </div>
    <div className={styles.errMsg}>
       optionel
    </div>
      </div>
   {/*  */}
{/* city */}
<div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="City">City</label>
    </div>
    
    <div className={styles.input}>
      <input
        type="text"
        name="city"
        placeholder="City"
        onBlur={(e) => this.inputText[e.target.name] = e.target.value}

      />
    </div>
    <div className={styles.errMsg}>
    optionel
    </div>
      </div>
    {/*  */}
   {/*  */}
{/* number phone */}
<div className={styles.outboxForm}>
      <div className={styles.label}>
      <label htmlFor="NumberPhone">Number Phone</label>
    </div>
    
    <div className={styles.input}>
      <input
        type="phone"
        name="numberPhone"
        placeholder="Number Phone "
        onBlur={(e) => this.inputText[e.target.name] = e.target.value}

      />
    </div>
    <div className={styles.errMsg}>
      optionel
    </div>
      </div>
      </div>
    {/*  */}


    <div className={styles.outStyle}>
      <input type="submit" value="Register" className={styles.btnStyle} onClick={this.handleClick}/>
    </div>
    <div className={styles.footer}>
      <p>
    Do you have an account?<a href='/LoginTest' >Login</a>
    </p>
    <p>
    Do you have an account seller ? <a href='/RegisterVendeur' >Login Vendeur</a>
    </p>
    </div>
      </div>
      </div>
            </div>
        )
    }
}

export default Register
