const { response, json } = require('express');
 var  Departement= require('../models/FrontOffice/Department.module')


//list Departement
const getDepartemnet = async (req, res,next) => {
 
 // const cate = await Category.find();

let query = req.query;
    await Departement.getAllDepartments(query,(err,DepartementList)=>{

        if(err) return next(err)
          res.json(DepartementList)
      });
      

   
};

//Add new Departement
let addNewDepartement = async(req,res,next)=>{
  var addDepartement = new Departement({
    name:req.body.name,
    categories:req.body.categories
  })
   await Departement.addDepartement(addDepartement,function (err, departement){
    if(err) return next(err.message)
    res.send(departement);
 
  })
}


//DELETE
//delete Departement by id 

let DeleteDepartementById=async(req,res,next)=>{
  let {id}= req.params;
  await Departement.deleteDepartementById(id,(err,departement)=>{
    if(err)return next(err);
    res.json({message:`delete Departement ${departement}`})
  })
}
//delete Departement by name
let DeleteDepartementByName=async(req,res,next)=>{
  let {name}= req.params;
  await Departement.deleteDepartementByName(name,(err,departement)=>{
    if(err)return next(err);
    res.json({message:`delete Departement ${departement}`})
  })
}


//Update

let UpdateDepartement= async(req,res,next)=>{
  let {id} = req.params;
  let DepartementUpdate= {
    name : req.body.name,
    categories:req.body.categories
  };
  await Departement.updateDepartement(id,DepartementUpdate,(err,newDepartement)=>{
    if(err) return next(err);
    res.json({message:'Update Departement',
           Departement:newDepartement})
  })
}



  module.exports={getDepartemnet,addNewDepartement,DeleteDepartementById,DeleteDepartementByName,UpdateDepartement}