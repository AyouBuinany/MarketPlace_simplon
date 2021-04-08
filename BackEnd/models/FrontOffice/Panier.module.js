var mongoose = require('mongoose');

var panierSchema = mongoose.Schema({
  items: {
    type: Object
  },
  totalQty: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  userId: {
    type: String
  }
});

var Panier = module.exports = mongoose.model('Panier', panierSchema);
//get all product from panier
module.exports.getPanierByUserId = function (uid, callback) {
  let query = {userId: uid}
   Panier.find(query, callback)
}

module.exports.getPanierById = function (id, callback) {
  Panier.findById(id, callback)
}

module.exports.updatePanierByUserId = function (userId, newPanier, callback) {
  let query = { userId: userId }
  Panier.find(query, function (err, p) {
    if (err) throw err

    //exist cart in databse
    if (p.length > 0) {
      Panier.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            items: newPanier.items,
            totalQty: newPanier.totalQty,
            totalPrice: newPanier.totalPrice,
            userId: userId
          }
        },
        { new: true },
        callback
      )
    } else {
      //Panier Not in database
      newPanier.save(callback)
    }
  })
}

module.exports.updatePanierByPanierId = function (userId, newPanier, callback) {
  Panier.findById(
    { userId: userId },
    {
      $set: newPanier
    },
    callback
  )
}



module.exports.createPanier = function (newPanier, callback) {
  newPanier.save(callback)
}