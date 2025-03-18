const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const Recipe = require('../models/recipe'); 
const isSignedIn = require('../middleware/is-signed-in');

router.get('/', isSignedIn, async (req, res) => {
  try {
    const userId = req.session.user._id; 
    const recipes = await Recipe.find({ author: userId });

    res.render('recipes/index.ejs', { recipes, user: req.session.user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', isSignedIn, (req, res) => {
  res.render('recipes/new.ejs', { user: req.session.user }); 
});

router.post('/', isSignedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const newRecipe = new Recipe({
      recipeName: req.body.recipeName,
      author: userId, 
      notes: req.body.notes,
      postingLink: req.body.postingLink,
      category: req.body.category,
      ingredients: req.body.ingredients
    });

    await newRecipe.save();
    res.redirect(`/users/${userId}/recipes`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
