
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const { number } = require('joi');

var vendeurSchema = mongoose.Schema({
    email: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    
    status: {
        type: String,
        default:'demande'
    },
    adress: {
        type: String
    },
    city: {
        type: String
    },
    numberPhone: {
        type: String
    },
    type: {
        type: String,
        enum : ['Starter','Expert','Pro'],
        default: 'Starter'
    },
    resetToken:{
        type: String
    },
    expireToken:{
        type:Date,
        default: Date.now
    },
    date_creation:{
        type:Date,
        default:Date.now
    },
    totalSeller:{
        type: Number, 
        defult:0 
    }
});

var Vendeur = module.exports = mongoose.model('Vendeur', vendeurSchema);
//Add vendeur
module.exports.createVendeur = function (newVendeur, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newVendeur.password, salt, function (err, hash) {
            newVendeur.password = hash;
            newVendeur.save(callback);
        });
    });
}

module.exports.getVendeurByEmail = function (email, callback) {
    var query = { email: email };
    Vendeur.findOne(query, callback);
}


module.exports.getVendeurById = function (id, callback) {
    Vendeur.findById(id, callback);
}
module.exports.comparePasswordVendeur = function (givenPassword, hash, callback) {
    bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getAllVendeur = function (callback) {
    Vendeur.find(callback)
}