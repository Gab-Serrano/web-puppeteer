const recipe = require('../models/recipeModel');
const scrapingService = require('../services/scrapingService');

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

exports.scrapeRecipe = async (req, res) => {
    try{
        const { url } = req.body;
        console.log('Scrapeando receta:', url);
        if (!url) {
            return res.status(400).json({ error: 'La URL es requerida en el cuerpo de la solicitud' });
        }

        const newRecipe = await scrapingService.scrapeDataFromUrl(url);

        res.status(200).json({
            status: 'success',
            data: {
                recipe: newRecipe,
            },
        });

    } catch (err) {
        console.error('Error al scrapear la receta:', err);
        res.status(500).json({
            status: 'fail',
            message: 'Error al scrapear la receta',
            error: err.message,
        });

    };
};
