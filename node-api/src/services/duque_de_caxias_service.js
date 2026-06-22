import axios from "axios";
import { getCache, setCache } from "../cache/redis.js";

export async function DuqueDeCaxiasService(year) {
  try {
    const CACHE_KEY = `duque-de-caxias:contratos:${year}`;

    let data = await getCache(CACHE_KEY);

    if (!data) {
      const response = await axios.post(
        "https://transparencia.duquedecaxias.rj.gov.br/sincronia/apidados.rule?sys=LAI",
        {
          api: "contratos_cadastro_transparencia_m2",
          ano: year
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      data = response.data;

      await setCache(CACHE_KEY, data, 86400);
    }

    return {
      prefeitura: "Duque de Caxias",
      ano: year,
      totalContracts: data?.dados?.length || 0,
      data
    };

  } catch (error) {
    throw new Error(
      `Erro ao buscar contratos da prefeitura Duque de Caxias: ${error}`
    );
  }
}