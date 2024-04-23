const Recipe = require('../models/recipeModel');
const puppeteer = require('puppeteer');

exports.scrapeDataFromUrl = async (url) => {
   const newRecipe = new Recipe();
   const data = await getDataFromWebPage(url);
   console.log('Scrapeado finalizado:', data);
   return data;
}

async function getDataFromWebPage(url) {
   const browser = await puppeteer.launch({ headless: true, slowMo: 0 });
   const page = await browser.newPage();
 
   await page.setExtraHTTPHeaders({
     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
     'upgrade-insecure-requests': '1',
     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
   });
 
   await page.goto(url);
   const data = await page.evaluate(() => {
      const title = document.querySelector("h1").innerText;
      return title;
   });
   await browser.close();
   return data;
}