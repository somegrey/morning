var express = require('express');
var router = express.Router();
var UserModel = require('../models/users.js');
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
var articleModel= require('../models/articles')

/* POST sign up. */
router.post('/sign-up', async function(req, res, next) { 
  var error = [];
  var result = false;
  var match = await UserModel.findOne({ email: req.body.email });
  if (match !== null){
    error.push('Email déjà associé à un compte');
  } else if (req.body.username == '' || req.body.email == '' || req.body.password == ''){
    error.push('Champ manquant');
  } else {
    var hash = bcrypt.hashSync(req.body.password, 10);
    var newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      lang: "fr",
      token: uid2(32)
    });
    var userSaved = await newUser.save();
    result = true
  } 
  res.json({result, userSaved, error})
});

/* POST sign in. */
router.post('/sign-in', async function(req, res, next) {
  var user = await UserModel.findOne({ email: req.body.email });
  var result = false;
  var error2 = [];
  if (req.body.email == '' || req.body.password == ''){
    error2.push('Champ manquant')
  } else if (bcrypt.compareSync(req.body.password, user.password)){
    result = true;
    user = user;
  } else { 
    error2.push('Mot de passe incorrect');
  };
  res.json({result, user, error2});
});

/* POST ajout articles wishlist*/
router.post('/addtowishlist', async function(req, res, next) {
  var article = await articleModel.findOne({title: req.body.titleFromFront})
  var articles = await articleModel.find()
  var userArticles = await UserModel.findById(req.body.idFromFront).populate('articleIds').exec();
  var user= await UserModel.findById(req.body.idFromFront);

  if(article){
    user.articleIds.push(article)
    var userSaved = await user.save();

  } 
  else {
    var newArticle = new articleModel({
      title: req.body.titleFromFront,
      description: req.body.descriptionFromFront,
      content: req.body.contentFromFront,
      image: req.body.imageFromFront,
      url: req.body.urlFromFront,
      lang: req.body.langFromFront
    });
    var newArticleSaved = await newArticle.save();
    user.articleIds.push(newArticleSaved)
    var userSaved = await user.save();
  }
  res.json({articlesUser: user.articleIds});
});

/* GET wishlist*/
router.get('/getwishlist', async function(req, res, next) {
  var user = await UserModel.findOne({token: req.query.token}).populate('articleIds').exec();
  res.json({articles: user.articleIds});
});

/* PUT choix de langue. */
router.put('/chose-lang/:id', async function(req, res, next) {
  var user = await UserModel.findById(req.params.id);
  await UserModel.updateOne(
    {_id: req.params.id},
    {lang: req.body.lang}
  )
  console.log(user)
  res.json(user)
});

module.exports = router;
