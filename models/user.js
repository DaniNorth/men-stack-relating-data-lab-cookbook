const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  username: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Recipe' }]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
