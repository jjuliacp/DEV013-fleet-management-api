import express from "express";
//import taxisRouter from "./routes/taxis";  aqui importar router para declarar
 
const app = express();
app.use(express.json()); // transforma req.body a un json

const PORT = 3000;

app.get("/", (_req, res) => { // _ para ignorar que no esta siendo utilizado 
  res.send("working");
});

//registrar rutas??
// app.use(routerTaxis, trajectories?) cambiar hay que declarar las rutas con router

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
