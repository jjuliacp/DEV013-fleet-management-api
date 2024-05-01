import express from "express";
import router from "./routes/taxis";
//swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";
import tjsRouter from "./routes/trajectories";

//import taxisRouter from "./routes/taxis";  aqui importar router para declarar

const app = express();
app.use(express.json()); // transforma req.body a un json

const PORT = process.env.PORT || 3000; // deberia ir a .env

app.get("/", (_req, res) => { // _ para ignorar que no esta siendo utilizado 
  res.send("working");
});

//registrar rutas??
app.use(router, tjsRouter)

// app.use(routerTaxis, trajectories?) cambiar hay que declarar las rutas con router
const specs = swaggerJSDoc(options) // utilizar configuración para  ruta /docs 
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
