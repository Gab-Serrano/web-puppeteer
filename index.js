const puppeteer = require('puppeteer');

class Receta {
  constructor(titulo, imagen, url, recipeData, specialNeeds, nutritionalInfo, additionalInfo, recipeIngredients, recipeCategory, recipeInstructions, yieldPerAge) {
    this.titulo = titulo;
    this.imagen = imagen;
    this.url = url;
    this.recipeData = recipeData;
    this.specialNeeds = specialNeeds;
    this.nutritionalInfo = nutritionalInfo;
    this.additionalInfo = additionalInfo;
    this.recipeIngredients = recipeIngredients;
    this.recipeCategory = recipeCategory;
    this.recipeInstructions = recipeInstructions;
    this.yieldPerAge = yieldPerAge;
  }
}

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({ headless: true, slowMo: 0 });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'upgrade-insecure-requests': '1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  });

  await page.goto("https://www.nestlecocina.es/receta/brandada-de-vuna");

  const data = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const metaTagsImage = Array.from(document.querySelectorAll("meta[property='og:image']"));
    const imagen = metaTagsImage.length > 0 ? metaTagsImage[0].getAttribute("content") : null;
    const metaTagsUrl = Array.from(document.querySelectorAll("meta[property='og:url']"));
    const url = metaTagsUrl.length > 0 ? metaTagsUrl[0].getAttribute("content") : null;

    const recipeDataElement = document.querySelector(".recipe_data");
    const difficulty = recipeDataElement.querySelector("span:nth-child(1)").innerText.trim();
    const portions = recipeDataElement.querySelector("span:nth-child(2)").innerText.replace(/\n/g, ' ').trim();
    
    const prepTimeElement = recipeDataElement.querySelector("span:nth-child(3)");
    const prepTime = prepTimeElement ? prepTimeElement.innerText.replace(/\n/g, ' ').trim() : '0 min.';
    
    const cookTimeElement = recipeDataElement.querySelector("span:nth-child(4)");
    const cookTime = cookTimeElement ? cookTimeElement.innerText.replace(/\n/g, ' ').trim() : '0 min.';

    const specialNeedsElement = document.querySelector(".special_needs_container");
    const specialNeeds = specialNeedsElement ? Array.from(specialNeedsElement.querySelectorAll("span")).map(span => span.innerText) : [];

    const nutritionalInfoElement = document.querySelector(".nutrition_content");
    const kcalRation = nutritionalInfoElement.querySelector(".kcal_ration span").innerText;
    const fats = Array.from(nutritionalInfoElement.querySelectorAll(".fats td")).map(td => td.innerText);
    const hydrates = Array.from(nutritionalInfoElement.querySelectorAll(".hydrates td")).map(td => td.innerText);
    const proteins = Array.from(nutritionalInfoElement.querySelectorAll(".proteins td")).map(td => td.innerText);

    // New: Scraping additional nutritional information
    const additionalInfoElement = document.querySelector(".nutrition_data");
    const sugars = additionalInfoElement.querySelector("td:nth-child(2)").innerText;
    const fiber = additionalInfoElement.querySelector("tr:nth-child(2) td:nth-child(2)").innerText;
    const saturatedFats = additionalInfoElement.querySelector("tr:nth-child(3) td:nth-child(2)").innerText;
    const salt = additionalInfoElement.querySelector("tr:nth-child(4) td:nth-child(2)").innerText;

    // New: Scraping recipe ingredients
    const recipeIngredientsElement = document.querySelector(".dropdown_content.ingredients");
    const recipeIngredients = recipeIngredientsElement ? Array.from(recipeIngredientsElement.querySelectorAll("ul li")).map(li => li.innerText) : [];

    // New: Scraping recipe category
    const keywordsMeta = document.querySelector("meta[name='keywords']").getAttribute("content");
    const recipeCategory = keywordsMeta.split(",").map(keyword => keyword.trim());

    // New: Scraping recipe instructions
    const recipeInstructionsElement = document.querySelector(".dropdown_content.elaboration_text");
    const recipeInstructions = recipeInstructionsElement ? Array.from(recipeInstructionsElement.querySelectorAll("p")).map(p => p.innerText) : [];

    // New: Scraping portions by age
    const portionByAgeElement = document.querySelector(".dishes_container");
    const adultPortion = portionByAgeElement.querySelector(".adult p.text").innerText;
    const threeToEightPortion = portionByAgeElement.querySelector(".child p.text").innerText;
    const nineToTwelvePortion = portionByAgeElement.querySelector(".preteen p.text").innerText;
    const teenPortion = portionByAgeElement.querySelector(".teen p.text").innerText;

    return { title, imagen, url, recipeData: { difficulty, portions, prepTime, cookTime }, specialNeeds, nutritionalInfo: { kcalRation, fats, hydrates, proteins }, additionalInfo: { sugars, fiber, saturatedFats, salt }, recipeIngredients, recipeCategory, recipeInstructions, yieldPerAge: { adult: adultPortion, threeToEight: threeToEightPortion, nineToTwelve: nineToTwelvePortion, teen: teenPortion } };
  });

  await browser.close();

  const receta = new Receta(data.title, data.imagen, data.url, data.recipeData, data.specialNeeds, data.nutritionalInfo, data.additionalInfo, data.recipeIngredients, data.recipeCategory, data.recipeInstructions, data.yieldPerAge);
  return receta;
}

getDataFromWebPage().then(receta => {
  console.log(receta);
}).catch(error => {
  console.error("Error:", error);
});