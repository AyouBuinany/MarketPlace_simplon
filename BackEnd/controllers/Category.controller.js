const { response, json } = require('express');
 var  Category= require('../models/FrontOffice/Category.module')



const getCategory = async (req, res,next) => {
 
    await Category.getAllCategories((err,c)=>{
;
      if (err) return next(err)
      res.json({ categories: c })
      });
};

//Add new category
let addNewCategory = async(req,res,next)=>{
  var addCat = new Category({
    name:req.body.name
  })
   await Category.addCategory(addCat,function (err, category){
    if(err) return next(err.message)
    res.send(category);
 
  })
}


//DELETE
//delete Category by id 

let DeleteCtegoryById=async(req,res,next)=>{
  let {id}= req.params;
  await Category.deleteCategoryById(id,(err,category)=>{
    if(err)return next(err);
    res.json({message:`delete category ${category}`})
  })
}
//delete category by name
let DeleteCtegoryByName=async(req,res,next)=>{
  let {name}= req.params;
  await Category.deleteCategoryByName(name,(err,category)=>{
    if(err)return next(err);
    res.json({message:`delete category ${category}`})
  })
}


//Update

let UpdateCategory= async(req,res,next)=>{
  let {id} = req.params;
  let categoryUpdate= {
    name : req.body.name
  };
  await Category.updateCategory(id,categoryUpdate,(err,newCategory)=>{
    if(err) return next(err);
    res.json({message:'Update category',
           Category:newCategory})
  })
}



  module.exports={getCategory,addNewCategory,DeleteCtegoryById,DeleteCtegoryByName,UpdateCategory}