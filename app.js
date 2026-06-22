import express from "express";
import { connectRedis } from "./src/cache/redis.js";
import duqueDeCaxiasRoutes from "./src/routes/duque_de_caxias_routes.js"

const app = express();

app.use("/api/prefeituras/duque-de-caxias", duqueDeCaxiasRoutes);

async function main(){
  try {
    await connectRedis();
    
    app.listen(3000, () => {
      console.log("Servidor iniciado na porta 3000");
    });     
  } catch (error) {
    
  }
}

main();