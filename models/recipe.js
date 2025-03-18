const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema ({
  quality: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['cup', 'tbsp', 'tsp', 'g', 'kg', 'oz', 'lb', 'ml', 'l', 'pinch', 'package', 'can', 'jar', 'serving'],
    required: true

  },
  ingriedentName: {
    type: String,
    required: true
  },
});

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true
  },
  authorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String
  },
  category: {
    type: String,
    enum: ['appetizer', 'entree', 'dessert', 'beverage', 'side dish','soup or salad', 'other'],
  },
  ingriedents: [ingredientSchema]
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipe: [recipeSchema]
});


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
