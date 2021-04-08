var paypal = require('paypal-rest-sdk');
var  Commande= require('../models/FrontOffice/Commande.module');
//Create config options, with parameters (mode, client_id, secret).
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeL8lvW7DKRJI2SCGyl6mEFcSKFMTLgsODZkfaMxKUFaQ0i0f0QB1h5NeUkAjcrXPEhGkPuYIKvI1M2E',
    'client_secret': 'EKcf_J_4mNlD94NaS6zZiSQOhARR2w5e_QBelv8-zjH3LfbffLDH9jiM0KbagkUI8-PCL3Tu5ogcBpCX'
  });
  

let MethodPaypal = (req,res,next)=>{

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://return.url",
            "cancel_url": "http://cancel.url"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "t-shirt",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "This is the payment description."
        }]
    };
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw next(error);
    } else {
        for(let i =0;i<payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
                console.log(payment.links[i].href);
                res.redirect(payment.links[i].href);
            }
        }
    }
});
}

let Success=  (req, res,next) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw next(error);
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  }
  
let Cancel =(req, res) => {
res.send('Cancelled')
}


//Get All Commandes 

let ListCommande= async (req,res,next)=>{
   await Commande.getAllCommandes((err,list)=>{
        if(err) return next(err);
        if(list.length){
        res.send({
            commande:list
        });
    }else{
        let err = new ErrorHandler('list commande ', 403, { message: "list commande vide" })
        return next(err)
    }
    })
}
let AddCommande= async (req,res,next)=>{
    let newCommande = new Commande({
        idClient: req.body.idClient,
        prixTotal:req.body.prixTotal,
        adresse:req.body.adresse,
        ville:req.body.ville,
        codePostal:req.body.codePostal
    })
    await Commande.addCommande((err,list)=>{
         if(err) return next(err);
         if(list.length){
         res.send({
             commande:list
         });
     }else{
         let err = new ErrorHandler('list commande ', 403, { message: "list commande vide" })
         return next(err)
     }
     })
 }
 module.exports={MethodPaypal,Success,Cancel}