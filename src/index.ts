import express from "express";
const app = express();
app.use(express.json()); // transforma req.body a un json

const PORT = 3000;

app.get("/", (_req, res) => { // _ para ignorar que no esta siendo utilizado 
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
