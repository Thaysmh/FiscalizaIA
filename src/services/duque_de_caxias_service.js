import axios from "axios";
  
export default async function DuqueDeCaxiasService(data){
  try {
    const response = await axios.post(
      "https://transparencia.duquedecaxias.rj.gov.br/sincronia/apidados.rule?sys=LAI",
      {
        api: "contratos_base_local",
        ano: data.year
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