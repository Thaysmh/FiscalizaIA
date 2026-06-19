import express from "express";
import { get_duque_de_caxias } from "./src/controllers/prefeituras/duque_de_caxias_controller";

const app = express();

app.get("/", (req, res) => {
  res.send("Servidor Express rodando!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
}); 

app.get("/duque-de-caxias", get_duque_de_caxias);