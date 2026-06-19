import { createClient } from "redis";

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  }
});

client.on("error", (err) => {
  console.error("Erro de conexão com o Redis:", err);
});

export async function connectRedis() {
  try {
    await client.connect();
    console.log("Conectado ao Redis com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao Redis:", error);
  }
}

export async function setCache(key, value, ttl = 86400) {
  await client.set(key, JSON.stringify(value), {
    EX: ttl
  });
}

export async function getCache(key){
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

export async function deleteCache(key){
  await client.del(key);
}