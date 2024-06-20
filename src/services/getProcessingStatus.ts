import axios from "axios";
import {
  dividirStringParaObjeto,
  extrairConteudoEntreAspas,
} from "../utils/stringFunctions";

export const getProcessingStatus = async () => {
  try {
    const processosIds = localStorage.getItem("processIds");

    let arrayProcessosIds: string[] = [];
    if (processosIds) {
      arrayProcessosIds = extrairConteudoEntreAspas(processosIds);
    }

    if (arrayProcessosIds.length > 0) {
      // pegas os ids e nomes para fazer as requisições
      const requests = arrayProcessosIds.map((item) => {
        const { id, name } = dividirStringParaObjeto(item);
        return axios
          .get(`/api/processing/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userId")}`,
            },
          })
          .then((response) => ({ name, data: response.data.processing }));
      });

      // espera as requisições ficarem prontas
      const results = await Promise.all(requests);

      // contruindo o objeto que retorna  retornado para o resultado
      const processStatusMap: { [key: string]: any[] } = {};
      results.forEach((result) => {
        if (!processStatusMap[result.name]) {
          processStatusMap[result.name] = []; // incia o array se a chave ainda não existir
        }
        processStatusMap[result.name].push(result.data); // adiciona o valor ao array
      });

      return processStatusMap;
    } else {
      console.log("Nenhum ID de processo encontrado.");
    }
  } catch (error) {
    console.error("Falha ao buscar status do processo:", error);
  }
};
