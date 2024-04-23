const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
      title: {
         type: String,
         required: true,
         minlength: 5,
         maxlength: 255
      },
      uri: {
         type: String,
         required: true,
         minlength: 5,
         maxlength: 255
      },
      image: {
         type: String,
         required: true,
         minlength: 5,
         maxlength: 255
      },
      recipeData: [
         {dificulty: String},
         {yield: String},
         {preparationTime: String},
         {cockingTime: String},
      ]

   });