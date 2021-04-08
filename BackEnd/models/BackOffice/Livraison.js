var mongoose = require('mongoose');

var livraisonSchema = mongoose.Schema({
  date: {
    type: Date,
    default:Date.now
  },
  idCommande: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commandes'
  },
});

var Livraison = module.exports = mongoose.model('Livraison', livraisonSchema);

module.exports.getAllLivraison = function (callback) {
  Livraison.find(callback)
}

//get Livraison by id
module.exports.getLivraisonById = function (id,callback) {
    Livraison.findById(id,callback)
}

//remove Livraison
module.exports.deleteLivraison = function (id,callback) {
    Livraison.findByIdAndRemove(id,callback)
}

//remove All Livraison
module.exports.removeAllLivraison = function (callback) {
    Livraison.remove({},callback)
}
//add Livraison
module.exports.addLivraison= function(newLivraison , callback){
    newLivraison.save(callback);
}
//modifier Livraison
module.exports.updateLivraison = function (id,LivraisonUpdate,callback) {
    Livraison.findByIdAndUpdate(id,{$set:LivraisonUpdate},callback)
}