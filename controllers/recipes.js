const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeSchema');
const User = require('../models/userSchema');


const isAuthenticated = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};


router.post('/add', isAuthenticated, async (req, res) => {
  try {
    const { recipeName, notes, postingLink, category, ingredients } = req.body;

    const newRecipe = new Recipe({
      recipeName,
      author: req.user._id,
      notes,
      postingLink,
      category,
      ingredients
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
