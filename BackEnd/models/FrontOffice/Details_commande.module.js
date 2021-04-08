const { Double } = require('bson');
var mongoose = require('mongoose');

var commandeSchema = mongoose.Schema({
  idCommande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'commandes'
  },
  idProduit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  },
  quantite: {
    type: Number
  }
});

var Details_commande = module.exports = mongoose.model('Details_Commande', commandeSchema);
//list details commandes
module.exports.getAllDetailsCommandes = function (callback) {
  Details_commande.find(callback)
}

//add details commandes
module.exports.addDetailsCommande= function(newDetailsCommande , callback){
  newDetailsCommande.save(callback);
}

//delete details commandes by commande
module.exports.deleteDetailsCommande = function (id,callback) {
  Details_commande.findOneAndRemove({idCommande:id},callback);
}