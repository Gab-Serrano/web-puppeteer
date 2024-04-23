const recipe = require('../models/recipeModel');

exports.getAllRecipes = async (req, res) => {
   try {
       console.log('Obteniendo todas las recetas...');
       const recipes = await recipe.find();
       console.log('Recetas obtenidas:', recipes);
       res.status(200).json({
           status: 'success',
           results: recipes.length,
           data: {
               recipes,
           },
       });
   } catch (err) {
       console.error('Error al obtener todas las recetas:', err);
       res.status(500).json({
           status: 'fail',
           message: 'Error al obtener todas las recetas',
           error: err.message,
       });
   }
};

exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = await recipe.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                recipe: newRecipe,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Error al crear la receta',
            error: err.message,
        });
    }
};
