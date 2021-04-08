const express= require('express');
const Category= require('../controllers/Category.controller');
const route = express.Router();
const auth = require('../midelleware/auth');
const admin = require('../midelleware/admin')

route.get("/category",Category.getCategory);
route.post("/addCategory",Category.addNewCategory);
route.delete("/deleteCategory/:id",Category.DeleteCtegoryById);
route.delete("/deleteCategoryName/:name",Category.DeleteCtegoryByName);
route.put('/updateCategory/:id', Category.UpdateCategory);
module.exports=route;