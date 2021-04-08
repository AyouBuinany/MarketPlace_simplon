const Product = require('../models/FrontOffice/Product.module');
var fs = require('fs');
var path = require('path')
const multer = require('multer');
const { exchangeRates , currencies } = require('exchange-rates-api');

let folder= path.join(__dirname,'../../FrontEnd/public');
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      console.log(folder + "and " + cb)
            cb(null, path.join(folder ,'/images/'))
        },
    filename: (req, file, cb) => {
        
                //cb(null,new Date().toISOString() + file.originalname);
                cb(null, new Date().toISOString().replace(/:/g,'-')+ file.originalname)
            }
  
  });
  const fileFilter=(req, file, cb)=>{
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
var upload = multer()
  var upload = multer({
    storage: storage,
     limits: {
        fieldSize: 1024 * 1024 * 5
     },
    fileFilter: fileFilter
    
});
//Upload Single Image
  let showImageSingle = upload.single('image');



const getProduct = async (req, res,next) => {
  const { query, order } = categorizeQueryString(req.query)
console.log('query ');
console.log(query);
  await Product.getAllProducts(query, order, function (e, products) {
     if (e) {
       e.status = 406; return next(e);
     }
     if (products.length < 1) {
       return res.status(404).json({ message: "products not found" })
     }
     res.json({ products: products })
   }) 
};
const url = 'http://localhost:3001';
//Add new product
let addNewProduct = async(req,res,next)=>{
 
  var addProduct = new Product({
    image:url + '/images/' + req.file.filename,
    title:req.body.title,
    description:req.body.description,
    category:req.body.category,
    price:req.body.price,
    quantity:req.body.quantity,
    vendeur:req.body.vendeur
  })
   await Product.addProduct(addProduct,function (err, product){
    if(err) return next(err.message)
    res.send(product);
 
  })
}


//DELETE
//delete Product by id 

let DeleteProductById=async(req,res,next)=>{
  let {id}= req.params;
  await Product.deleteProductById(id,(err,product)=>{
    if(err)return next(err);
    res.json({message:`delete product ${product}`})
  })
}



//Update

let UpdateProduct= async(req,res,next)=>{
  let {id} = req.params;
  let productUpdate= {
    image: url + '/pics/' + req.file.filename,
    title:req.body.title,
    description:req.body.description,
    category:req.body.category,
    department:req.body.department,
    price:req.body.price,
    quantity:req.body.quantity
  };
  await Product.updateProduct(id,productUpdate,(err,newProduct)=>{
    if(err) return next(err);
    res.json({message:'Update product',
           Product:newProduct})
  })
}



  
let ProductById= async function (req, res, next) {
    let {id} = req.params;
    await Product.getProductByID(id,(err,product)=>{
      if(err) return next(err);
      res.json({product :product})
    })
    
 
  }
  
  let removeAllProduct= async(req,res,next)=>{
    await Product.removeAllProduct((err,product)=>{
        if(err) return next(err);
        res.json({
          message: `Remove All ${product} `
        })
    })
  } 
  //ExchangeCurrencies
  const ExchangeCurrencies = async (req,res,next) => {
    try{
   let data= await exchangeRates().latest()
    .base(currencies.USD)
    .symbols([currencies.EUR, currencies.USD])
    .fetch();
    res.json(data)
    }catch(err){
      next(err);
    }
};

//function  to get Query and order

function categorizeQueryString(queryObj) {
  //categorizeQueryString(req.query)
  let query = {}
  let order = {}
  //extract query, order, filter value
  for (const i in queryObj) {
    if (queryObj[i]) {
      //console.log(queryObj[i]);
      // extract order
       if (i === 'order') {
         order['sort'] = queryObj[i]
        // console.log(order['sort']);
        continue
       }
       
       // extract range
     if (i === 'range') {
         let range_arr = []
         let query_arr = []
         // multi ranges
// console.log('queryObj[i]');
// console.log(queryObj[i]);
         if (queryObj[i].constructor === Array) {
          console.log(queryObj[i]);
           for (const r of queryObj[i]) {
            console.log('r ' + r);
             range_arr = r.split('-')
             console.log('arr ' + range_arr);
             query_arr.push({
            price: { $gt: range_arr[0], $lt: range_arr[1] }
            })
          }
        }
        // one range
        if (queryObj[i].constructor === String) {
          range_arr = queryObj[i].split('-')
          console.log('string  ' + range_arr);
          query_arr.push({
            price: { $gt: range_arr[0], $lt: range_arr[1] 
          }
          })
        }

        Object.assign(query,  {$or:query_arr} )
        
        console.log(query_arr);
        console.log(query);
        delete query[i]
        continue
         
      }
      query[i] = queryObj[i]
      console.log('query ii ' +  query[i] );
     
    }
  }
  return { query, order }
}

  module.exports = {getProduct,addNewProduct,DeleteProductById,UpdateProduct,ProductById,showImageSingle,removeAllProduct,ExchangeCurrencies}
