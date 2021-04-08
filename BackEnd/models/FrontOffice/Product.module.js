var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  image: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now()
  },
  vendeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendeurs'
  }
});

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getAllProducts = function (query, sort, callback) {
  Product.find(query, null, sort, callback)
}



module.exports.getProductByCategory = function (query,sort, callback) {
  Product.find(query, null, sort, callback)
}

module.exports.getProductByTitle = function (query,sort, callback) {
  Product.find(query, null, sort, callback)
}


module.exports.getProductByID = function (id, callback) {
  Product.findById(id, callback);
}


module.exports.addProduct = function (newProduct, callback) {
  newProduct.save(callback);
}

module.exports.deleteProductById=function(id,callback){
  Product.findByIdAndRemove(id,callback);
}

module.exports.updateProduct = function(id,ProductUpdate,callback) {
  Product.findByIdAndUpdate(id,{$set:ProductUpdate},callback);
}

module.exports.removeAllProduct = function(callback) {
  Product.remove({},callback);
}