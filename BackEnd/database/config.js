const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/FrontOffice/Product.module');
const Category = require('../models/FrontOffice/Category.module');
const Vendeur= require('../models/BackOffice/Vendeur.module');
mongoose.connect(process.env.DATABASE, {useUnifiedTopology: true,  useNewUrlParser: true,useCreateIndex: true});
mongoose.connection
        .once('open', ()=>console.log('Connected'))
        .on('error', (err)=>{
          console.log(`could not connect`, err);
        });

module.exports = mongoose;

// var categories =
//   [
//     new Category({
//       name: 'Packs Avantageux'
//     }),
//     new Category({
//       name: 'Bio & Naturel'
//     }),
//     new Category({
//       name: 'Solaire'
//     }),
//     new Category({
//       name: 'Visage'
//     }),
//     new Category({
//       name: 'Maternité'
//     }),
//     new Category({
//       name: 'Sexualité'
//     }),
//     new Category({
//       name: 'Hygiène'
//     })
//   ]
//   for (let i = 0; i < categories.length; i++) {
//     categories[i].save(function (e, r) {
//       if (i === categories.length - 1) {
//         exit();
//       }
//     });
//   }

  //product

  
// var products =
// [
//   new Product({
//     _id: "5bedf31cc14d7822b39d9d43",
//     imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/7568/644/802/2/w/1920/7568644802_1_1_1.jpg?ts=1541152091085',
//     title: 'HERBESAN',
//     description: 'Herbesan Panax Ginseng par les Laboratoires Super Diet, au Panax Ginseng Meyer qui contribue à préserver tonus et énergie, et à réduire la fatigue physique et intellectuelle. Sans colorant - Sans conservateur.',
//     category: 'Packs Avantageux',
//     price: 10.05,
//     quantity: 10,
//     vendeur:''
    
//   }),
//   new Product({
//     _id: "5bedf3b9c14d7822b39d9d45",
//     imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/5644/641/800/2/w/1920/5644641800_2_5_1.jpg?ts=1540395699528',
//     title: 'SAFORELLE',
//     description: 'SAFORELLE a pensé son soin lavant doux pour offrir aux femmes un produit mieux approprié aux toilettes intimes qu’un savon standard. Ne contenant ni paraben ni phénoxyéthanol, il  respecte aussi bien la sensibilité des muqueuses que l’équilibre naturel de la peau. Les femmes peuvent l’utiliser quotidiennement et sans crainte étant donné qu’il est riche en agents adoucissants et en extraits de bardane. Grâce à son pH alcalin doux, ce produit n’agresse nullement la zone et la flore vulvaires mais au contraire, les protège contre les irritations et démangeaisons éventuelles. Il a été testé sous la surveillance de médecins spécialistes en gynécologie et aussi en dermatologie. Le soin lavant doux de SAFORELLE convient également pour la toilette du corps.',
//     category: 'Packs Avantageux',
//     price: 10.05,
//     quantity: 10,
//     vendeur:''
//   }),
//   new Product({
//     _id: "5bedf3b9c14d7822b39d9d45",
//     imagePath: 'https://static.zara.net/photos///2018/I/0/1/p/5644/641/800/2/w/1920/5644641800_2_5_1.jpg?ts=1540395699528',
//     title: 'SAFORELLE',
//     description: 'SAFORELLE a pensé son soin lavant doux pour offrir aux femmes un produit mieux approprié aux toilettes intimes qu’un savon standard. Ne contenant ni paraben ni phénoxyéthanol, il  respecte aussi bien la sensibilité des muqueuses que l’équilibre naturel de la peau. Les femmes peuvent l’utiliser quotidiennement et sans crainte étant donné qu’il est riche en agents adoucissants et en extraits de bardane. Grâce à son pH alcalin doux, ce produit n’agresse nullement la zone et la flore vulvaires mais au contraire, les protège contre les irritations et démangeaisons éventuelles. Il a été testé sous la surveillance de médecins spécialistes en gynécologie et aussi en dermatologie. Le soin lavant doux de SAFORELLE convient également pour la toilette du corps.',
//     category: 'Packs Avantageux',
//     price: 10.05,
//     quantity: 10,
//     vendeur:''
//   })
// ];

// for (let i = 0; i < products.length; i++) {
// products[i].save(function (e, r) {
//   if (i === products.length - 1) {
//     exit();
//   }
// });
// }

// var vendeurs= [
//   new Vendeur({
//         _id: "5bedf31cc14d7822b39d9d43",
//         email: 'ayoub.elbouinany99@gmail.com',
//         password: 'Ayoub123',
//         firstName: 'Ayoub',
//         lastName: 'Elbouinany',
//         status: 'OK',
//         adress:'SAFI MOROCCO Trab sini',
//         city:'Safi',
//         numberPhone:"0680214562",
//         resetToken:null
//       })
// ]

// function exit() {
//   mongoose.disconnect();
// }