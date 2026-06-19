import axios from "axios";
  
export async function DuqueDeCaxiasService(year){
  try {
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
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar contratos da prefeitura Duque de Caxias: ${error}`);
  }

}