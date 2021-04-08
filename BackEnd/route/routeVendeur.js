const express= require('express');
const Vendeur= require('../controllers/Vendeur.controller');
const route = express.Router();
route.post("/vendeurs/register",Vendeur.RegisterVendeur);
route.post("/vendeurs/login",Vendeur.LoginVendeur);
route.post("/vendeurs/verify/:token",Vendeur.verifyPass);
module.exports=route;