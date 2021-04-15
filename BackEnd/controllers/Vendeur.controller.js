const Vendeur = require('../models/BackOffice/Vendeur.module');
const jwt = require('jsonwebtoken');
var validation = require('./ValidateSchema/validation');
var {ErrorHandler} = require('../midelleware/ErrorHandler')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
// Register
let RegisterVendeur = function (req, res, next) {
    const { firstName,lastName, email, password, verifyPassword,adress,city,numberPhone} = req.body
   // LETS VALIDATE THE DATA BEFORE WE ADD A SELLER
  const { error } = validation.registerValidationVendeur(req.body);
  if (error){
    let err = new ErrorHandler('signin error', 400, 'invalid_field', {
        errors: error.details[0].message
      })
    return next(err)
  } 
  
  
  var newSeller = new Vendeur({
    firstName,
    lastName,
    password,
    email,
    adress,
    city,
    numberPhone

  });

   // save new seller

    crypto.randomBytes(32,async (err,buffer)=>{
      let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'ayoub.elbouinany99@gmail.com',
         pass: 'Ayoub123@'
        },
      })
      if(err){
          console.log(err)
      }
       token = buffer.toString("hex")
       
       console.log(token);
       let info = await transporter.sendMail({
        from: 'Ayoub.elbouinany99@gmail.com', // sender address
        to: email, // list of receivers
        subject: "new password ✔", // Subject line
        html :
     `<div> thank you mr <b> ${firstName + ' ' + lastName + ' '}</b> <br> your welcome in this site <br> but you must to change your password  <br> 
      <a href=http://127.0.0.1:3001/verify/${token} > change password </a> </div>`
          // html body
      });
   
   
      newSeller.resetToken = token

      Vendeur.getVendeurByEmail(email, function (error, seller) {
        if (error) return next(err)
        if (seller) {
          let err = new ErrorHandler('signin error', 409, 'invalid_field', {
            message: "vendeur is existed"
          })
          return next(err)
        }
         Vendeur.createVendeur(newSeller, function (err, seller) {
          if (err) return next(err);
        res.json({ message: 'seller created', seller : seller })
         });
      })
    })
 


   
  }


  //Login 
  let LoginVendeur = function (req, res, next) {
    const { email, password } = req.body
    if (!email || !password) {
      let err = new ErrorHandler('login error', 400, 'missing_field', { message: "missing username or password" })
      return next(err)
    }
    Vendeur.getVendeurByEmail(email, function (err, seller) {
      if (err) return next(err)
      if (!seller) {
        let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
        return next(err)
      }
      Vendeur.comparePasswordVendeur(password, seller.password, function (err, isMatch) {
        if (err) return next(err)
        if (isMatch) {
          let token = jwt.sign(
            { seller: seller },
            process.env.TOKEN_SECRET,
            { expiresIn: '7d' }
          )
          res.status(201).header('auth-token',token).json({
            user_token: {
              seller_id: seller.id,
              seller_name: seller.fullname,
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


  //Verify Password 

 let verifyPass = async (req, res,next) => {
   
    const newPassword = req.body.password
    const sentToken = req.body.token
    console.log("sentToken");
    console.log(sentToken);
    Vendeur.findOne({resetToken:sentToken})
    .then(seller=>{
        console.log(seller);
        if(!seller){
            let err = new ErrorHandler('verify passsword ', 403, 'invalid_field', { message: " Not find seller" })
        return next(err)
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newPassword, salt, function (err, hash) {
                seller.password = hash;
                seller.resetToken = undefined;
                seller.expireToken = undefined;
                seller.save().then((savedeller)=>{
                    res.json({message:"password success",savedeller:savedeller})
                });
            });
        });
        // bcrypt.hash(newPassword,10).then(hashedpassword=>{
        //    user.password = newPassword
        //    user.resetToken = undefined
        //    user.expireToken = undefined
        //    user.save().then((saveduser)=>{
        //        res.json({message:"success"})
        //    })
        // })
    }).catch(err=>{
        console.log(err)
        return next(err)
    })
}
  module.exports = {
      RegisterVendeur,LoginVendeur,verifyPass
  }