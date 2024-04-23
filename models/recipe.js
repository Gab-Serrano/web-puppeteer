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
      recipeData: {
         dificulty: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
         },
         yield: {
            type: Number,
            required: true,
         },
         preparationTime: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
         },
         cockingTime: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
         },
         required: true,
      },
      specialNeeds: {
         type: [String],
         required: true,
      },
      nutritionalInfo: {
         totalKcal: {
            type: Number,
            required: true,
         },
         fat: {
            kcal: {
               type: Number,
               required: true,
            },
            gr: {
               type: Number,
               required: true,
            },
            porcentage: {
               type: Number,
               required: true,
            },
            required: true,
         },
         carbohydrates: {
            kcal: {
               type: Number,
               required: true,
            },
            gr: {
               type: Number,
               required: true,
            },
            porcentage: {
               type: Number,
               required: true,
            },
            required: true,
         },
         protein: {
            kcal: {
               type: Number,
               required: true,
            },
            gr: {
               type: Number,
               required: true,
            },
            porcentage: {
               type: Number,
               required: true,
            },
            required: true,
         },
         additionalInfo: {
            sugars: {
               type: Number,
               required: true,
            },
            fiber: {
               type: Number,
               required: true,
            },
            saturatedFats: {
               type: Number,
               required: true,
            },
            salt: {
               type: Number,
               required: true,
            },
            required: true,
         },
         required: true,
      },
      yieldPerAge: {
         adult: {
            type: String,
            required: true,
         },
         threeToEight: {
            type: String,
            required: true,
         },
         nineToTwelve: {
            type: String,
            required: true,
         },
         teen: {
            type: String,
            required: true,
         },
         required: false,
      },
      ingredientLines: {
         type: [String],
         required: true,
      },
      directions: {
         type: [String],
         required: true,
      },
      chefTips: {
         type: [String],
         required: false,
      },
   });