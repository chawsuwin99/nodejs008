var express = require('express');
var router = express.Router();
var User=require('../model/User');
var Admin=require('../model/Admin');
var validator = require("email-validator");
var passwordValidator = require('password-validator');
/* GET home page. */
var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/homepage',function (req,res,next) {
  res.render('home',{title:'Home'});
});

router.get('/signup',function(req,res){
  res.render('signup');
});

router.post('/signup',function(req,res){
  var admin = new Admin();
  admin.Name=req.body.Name;
  admin.Email=req.body.Email;
  admin.Password=req.body.Password;
  admin.save(function(err,rtn){
    if (err) throw err;
    console.log(rtn);
    res.redirect('/signin');
  });
});

router.get('/signin',function(req,res){
  res.render('signin');
});

router.post('/signin',function(req,res){
  console.log('call');
  Admin.findOne({Email:req.body.Email},function(err,rtn){
    if (err) throw err;
    console.log(rtn);
    if(rtn !=null && Admin.compare(req.body.Password,rtn.Password)){
      req.session.user={name:rtn.name,email:rtn.email};
      res.redirect('/');
    }else{
      res.redirect('/signin');
    }
  })
})

router.post('/duemail',function(req,res){
  Admin.findOne({Email:req.body.email},function(err,rtn){
    if (err) throw err;
    console.log(rtn);
    if(rtn != null || !validator.validate(req.body.email)){
      res.json({status:true});
    }else{
      res.json({status:false});
    }
  })
})

router.post('/checkpwd',function(req,res){
  console.log('callll',req.body.pwd);
  res.json({status:schema.validate(req.body.pwd)});
})
module.exports = router;
