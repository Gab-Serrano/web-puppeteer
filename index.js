import puppeteer from "puppeteer";
const proxy = "http://44.219.175.186:80";

async function getDataFromWebPage () {
  // Abre el navegador y crea una nueva página
  const browser = await puppeteer.launch({headless: false, slowMo: 1000});
  const page = await browser.newPage();

  //Agrega Headers
   await page.setExtraHTTPHeaders({
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'upgrade-insecure-requests': '1',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
   });

  // Navega a la página elegida
  await page.goto("https://www.nestlecocina.es/receta/bocadillo-de-sensational-sausage");

  // Espera a que cargue la página
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Extrae la información que necesitas
  const data = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    return { title };
  });

   console.log(data);
  // Cierra el navegador
  await browser.close();
};

getDataFromWebPage();
