const express= require('express');
const Produit= require('../controllers/Product.Contoller');
const route = express.Router();
const auth = require('../midelleware/auth');
const admin = require('../midelleware/admin');

route.post("/addProduct",Produit.showImageSingle,Produit.addNewProduct);
route.get("/products",Produit.getProduct);
route.get("/product/:id",Produit.ProductById);
route.delete("/deleteProduct/:id",Produit.DeleteProductById);
route.put('/updateProduit/:id', Produit.UpdateProduct);
route.get('/removeAllProduct', Produit.removeAllProduct);
route.get('/example', Produit.ExchangeCurrencies);
module.exports=route;