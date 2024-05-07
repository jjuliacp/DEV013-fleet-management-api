import express from "express";
//swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";
import router from "./routes";

//import taxisRouter from "./routes/taxis";  aqui importar router para declarar

const app = express();
app.use(express.json()); // transforma req.body a un json


//registrar rutas??
app.use(router)

// app.use(routerTaxis, trajectories?) cambiar hay que declarar las rutas con router
const specs = swaggerJSDoc(options) // utilizar configuración para  ruta /docs 
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))



export default app