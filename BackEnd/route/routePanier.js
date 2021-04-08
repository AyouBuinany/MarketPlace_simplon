const express= require('express');
const Panier= require('../controllers/Panier.Controller');
const route = express.Router();
let auth = require('../midelleware/auth');


route.post("/users/:userId/cart",auth,Panier.AddToPanier);
route.get("/users/:userId/cart",auth,Panier.getCartByUserId);
route.get("/users",auth,Panier.getCartByUserId)

module.exports=route;