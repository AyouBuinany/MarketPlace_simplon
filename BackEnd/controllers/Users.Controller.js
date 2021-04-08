const User = require('../models/FrontOffice/User.module');
const jwt = require('jsonwebtoken');
var validation = require('./ValidateSchema/validation');
var {ErrorHandler} = require('../midelleware/ErrorHandler')
// Register
let RegisterUser = function (req, res, next) {
    const { firstName,lastName, email, password, verifyPassword} = req.body
   // LETS VALIDATE THE DATA BEFORE WE ADD A USER
  const { error } = validation.registerValidationUser(req.body);
  console.log(req.body);
  if (error){
    let err = new ErrorHandler('signin error', 400, 'invalid_field', {
      message: error.details[0].message
    })
    
    return next(err)
  } 
  
  
    var newUser = new User({
      firstName: firstName,
      lastName:lastName,
      password: password,
      email: email
    });
    User.getUserByEmail(email, function (error, user) {
      if (error) return next(err)
      if (user) {
        let err = new ErrorHandler('signin error', 409, 'invalid_field', {
          message: "user is existed"
        })
        
        return next(err)
      }
       User.createUser(newUser, function (err, user) {
        if (err) return next(err);
      res.json({ message: 'user created' })
       });
    })
  }


  //Login 
  let Login = function (req, res, next) {
    const { email, password } = req.body.credential
    
    const { error } = validation.loginValidation(req.body.credential);
    if(error){
      let err = ErrorHandler('login error', 400, 'missing_field', { message: error.details[0].message })
      return next(err)
    }

    User.getUserByEmail(email, function (err, user) {
      if (err) return next(err)
      if (!user) {
        let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
        return next(err)
      }
      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) return next(err)
        if (isMatch) {
          let token = jwt.sign(
            { user: user },
            process.env.TOKEN_SUCRET,
            { expiresIn: '7d' }
          )
          res.status(201).json({
            user_token: {
              user_id: user.id,
              user_name: user.firstName + ' ' + user.lastName,
              token: token,
              expire_in: '7d'
            }
          })
        } else {
          let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
          return next(err)
        }
      })
    })
  }

  module.exports = {
      RegisterUser,Login
  }