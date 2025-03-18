const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  quantity: { 
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['cup', 'tbsp', 'tsp', 'g', 'kg', 'oz', 'lb', 'ml', 'l', 'pinch', 'package', 'can', 'jar', 'serving'],
    required: true
  },
  ingredientName: {
    type: String,
    required: true
  }
});

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: { type: String },
  postingLink: { type: String },
  category: {
    type: String,
    enum: ['appetizer', 'entree', 'dessert', 'beverage', 'side dish', 'soup or salad', 'other'],
  },
  ingredients: [ingredientSchema]
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
