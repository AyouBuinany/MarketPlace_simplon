let Panier=require('../models/FrontOffice/Panier.module');
let panier_function = require('../models/FrontOffice/Panier.function');
let Product = require('../models/FrontOffice/Product.module');
const { ErrorHandler } = require('../midelleware/ErrorHandler');



let AddToPanier =function (req, res, next) {

 
  
      let userId = req.params.userId
        let { productId, increase, decrease } = req.body
    
      Panier.getPanierByUserId(userId, function (err, p) {
    if (err) return next(err)

       let oldPanier = new panier_function(p[0] || { userId })
      
       // no cart save empty cart to database then return response
       if (p.length < 1 && !productId) {
           return Panier.createPanier(oldPanier.generateModel(), function (err, resultPanier) {
             if (err) return next(err)
             return res.status(201).json({ panier: resultPanier })
           })
        }
         Product.findById(productId, function (e, product) {
           if (e) {
             e.status = 406;
            return next(e);
       }
           if (product) {
             if (decrease) {
               oldPanier.decreaseQty(product.id);
             } else if (increase) {
                oldPanier.increaseQty(product.id);
             } else {
                oldPanier.add(product, product.id);
             }
          
             let newPanier = oldPanier.generateModel();
            
             Panier.updatePanierByUserId(
                userId,
               newPanier,
          function (err, result) {
                if (err) return next(err)
              return res.status(200).json({ cart: result })
              })
          }else {
                let err = new ErrorHandler('/cart', 400, 'invalid_field', {
                  message: "invalid request body"
                })
                return next(err)
              }
            })
          })
        }

        // Get Cart By User ID
    let getCartByUserId= (req,res,next)=>{
       let userId = req.params.userId
     Panier.getPanierByUserId(userId, function (err, cart) {
     if (err) return next(err)
 if (cart.length < 1) {
       let err = new ErrorHandler('cart error', 404, 'not_found', { message: "create a cart first" })
       return next(err)
     }

    return res.status(201).json({ cart: cart[0] })
 })

    }

    module.exports={
      AddToPanier,getCartByUserId
    }