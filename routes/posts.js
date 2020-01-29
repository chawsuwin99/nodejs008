var express = require('express');
var router = express.Router();
var Post = require('../model/Post');
var User = require('../model/User');

router.get('/postadd',function (req,res) {
  User.find(function(err,rtn){
    if (err) throw err;
    res.render('post/post_add',{users:rtn});
  })
});

router.post('/postadd',function (req,res) {
  var post = new Post();
  post.Title = req.body.title;
  post.Content = req.body.content;
  post.Author = req.body.author;

  post.save(function (err,rtn) {
    if(err) throw err;
    res.redirect('/posts/postlist');
  });
});

router.get('/postlist',function (req,res) {
  Post.find({}).populate('Author').exec(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('post/post_list',{posts:rtn})
  })
});

router.get('/postdetail/:id',function (req,res) {
  Post.findById(req.params.id).populate('Author').exec(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('post/post_detail',{post:rtn});
  })
})

router.get('/postupdate/:id',function (req,res) {
  Post.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    User.find(function(err2,rtn2){
      if (err2)throw err2;
        res.render('post/post_update',{post:rtn,users:rtn2})
    })
  })
})

router.post('/postupdate',function (req,res) {
    var update = {
      Title: req.body.Title,
      Content: req.body.Content,
      Author : req.body.Author
    }
    Post.findByIdAndUpdate(req.body.id,{$set:update},function (err,rtn) {
      if(err) throw err;
      res.redirect('/posts/postlist');
    })
});

router.get('/postdelete/:id',function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.redirect('/posts/postlist');
  })
})
module.exports = router;
