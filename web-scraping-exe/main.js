const { app, BrowserWindow } = require('electron');
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // Agrega esta línea para importar el módulo path
require("dotenv").config();
const cors = require('cors');

// Crear la instancia de Express y configurarla
const appExpress = express();
appExpress.use(express.json());
appExpress.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const recipeRoutes = require("./routes/recipeRoutes");
appExpress.use(recipeRoutes);

const port = process.env.PORT || 3000;
const expressServer = appExpress.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

// Cerrar el servidor Express al salir de la aplicación de Electron
app.on('before-quit', () => {
  expressServer.close();
});

// Crear la ventana de Electron y cargar la URL del servidor Express
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'icon.png'
  });

  win.loadFile(path.join(__dirname, 'dist/web-scraping-client/browser', 'index.html'));
}

// Llamar a la función createWindow cuando la aplicación esté lista
app.whenReady().then(createWindow);
