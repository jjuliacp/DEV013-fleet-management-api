import app from "./app";
const PORT = process.env.PORT || 3000; // deberia ir a .env

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});