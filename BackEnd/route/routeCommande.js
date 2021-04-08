const express= require('express');
const Commande= require('../controllers/Commande.Controller');
const route = express.Router();
const auth = require('../midelleware/auth');
const admin = require('../midelleware/admin')

//route.get("/Commandes",auth,Commande.getCommande);
route.post("/Payer",Commande.MethodPaypal);
route.get('/Success',Commande.Success);
route.get('/Cancel',Commande.Cancel)
module.exports=route;