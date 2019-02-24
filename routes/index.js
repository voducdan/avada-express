var express = require('express');
var router = express.Router();
var theme = require('../model/product.js');
const paginate = require('express-paginate');

/* GET home page. */
router.get('/',async function(req, res, next) {
  theme.find({})
  .limit(9)
  .exec(await function(err,data){
    res.render('index',{products:data})
  })
});
// router.get('/themes', async function(req,res,next){
//   theme.find({})
//   .limit(15)
//   .exec(await function(err,data){
//     res.render('products',{products:data,page:1})
//   });
// });
router.get('/themes(/:page)?', async function(req,res,next){
  var perPage = 6;
  var page = req.params.page||1;
  theme.find({})
  .skip((perPage*page) - perPage)
  .limit(perPage)
  .exec(await function(err,data){
    theme.count(function(err,count){
      if(err) return next(err)
      res.render('products',{
        products:data,
        current:Number(page),
        pages:Math.ceil(count/perPage)
      })
    })
  });
});
router.get('/addtheme',function(req,res,next){
  res.render('addtheme');
});
router.post('/addtheme',function(req,res,next){
  var newTheme = new theme({
    name:req.body.name,
    image:req.body.image
  });
  newTheme.save(function(err){
    if(err) console.log(err);
    res.redirect('themes');
  }); 
});
router.get('/dan/:id',function(req,res,next){
  res.send('dan');
});

module.exports = router;
