import axios, { AxiosResponse } from "axios";
import {
  dividirStringParaObjeto,
  extrairConteudoEntreAspas,
} from "../utils/stringFunctions";
import { createUrls, downloadFiles } from "../utils/downloadFilesResult";

export const registerUser = async () => {
  try {
    if (!localStorage.getItem("userId")) {
      const response: AxiosResponse<any> = await axios.post(
        "/api/user/register"
      );

      if (!response.data.id) {
        throw new Error("Failed to register user");
      }

      const userId = response.data.id;

      console.log(`User registered with id: ${userId}`);
      localStorage.setItem("userId", userId);
    } else {
      alert(`USUARIO CRIADO COM O ID ${localStorage.getItem("userId")}`);
    }
  } catch (error) {
    console.error("Failed to register user:", error);
  }
};

export const uploadDataset = async (campaingParameters: any, index: number) => {
  try {
    if (!campaingParameters.parameters.datasetSelected) {
      console.error("Nenhum arquivo selecionado");
      return;
    }
    if (index.toString() === "0") {
      localStorage.removeItem("datasetIds");
    }

    const datasetIdsJson = localStorage.getItem("datasetIds");

    const datasetIds: string[] = datasetIdsJson
      ? JSON.parse(datasetIdsJson)
      : []; // converte string json para um array de strings

    const formData = new FormData();
    formData.append("dataset", campaingParameters.parameters.datasetSelected);
    formData.append(
      "description",
      `${campaingParameters.parameters.datasetSelected.name}`
    );

    const response: AxiosResponse<any> = await axios.post(
      "/api/dataset",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userId")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await datasetProcessing(campaingParameters, response.data.id);

    datasetIds.push(response.data.id);

    localStorage.setItem("datasetIds", JSON.stringify(datasetIds));
  } catch (error) {
    console.error("Failed to upload dataset:", error);
  }
};

const datasetProcessing = async (
  campaingParameters: any,
  datasetId: string
) => {
  const { datasetSelected, ...parameters } = campaingParameters.parameters;

  const requestData = {
    dataset_id: datasetId,
    processor: "droidaugmentor",
    params: parameters,
  };

  const processIdsJson = localStorage.getItem("processIds");

  const processIds: string[] = processIdsJson ? JSON.parse(processIdsJson) : []; // converte string json para um array de strings

  try {
    const response: AxiosResponse<any> = await axios.post(
      "/api/processing",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userId")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const teste = `${response.data.id}$$${campaingParameters.name}`;

    processIds.push(teste);
    localStorage.setItem("processIds", JSON.stringify(processIds));
  } catch (error) {
    console.error("Failed to processing dataset:", error);
  }
};

export const processingStatusToId = async () => {
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

      console.log(processStatusMap);
      return processStatusMap;
    } else {
      console.log("Nenhum ID de processo encontrado.");
    }
  } catch (error) {
    console.error("Failed to process status:", error);
  }
};

export const processingShowResult = async (processingId: string) => {
  const filesCategories = {
    fileKNN_Real: ["KNN_Real.pdf"],

    fileKNN_Synth: ["KNN_Synthetic.pdf"],

    fileComparison: ["Comparison_Real_Synthetic.pdf"],

    filesConfusionMatrixReal: [
      "confusion_matrix/CM_Real_KNN_k1.pdf",
      "confusion_matrix/CM_Real_KNN_k2.pdf",
      "confusion_matrix/CM_Real_KNN_k3.pdf",
      "confusion_matrix/CM_Real_KNN_k4.pdf",
      "confusion_matrix/CM_Real_KNN_k5.pdf",
    ],
    filesConfusionMatrixSynthetic: [
      "confusion_matrix/CM_Synthetic_KNN_k1.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k2.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k3.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k4.pdf",
      "confusion_matrix/CM_Synthetic_KNN_k5.pdf",
    ],
    filesTrainingCurve: [
      "training_curve/curve_training_error_k_1.pdf",
      "training_curve/curve_training_error_k_2.pdf",
      "training_curve/curve_training_error_k_3.pdf",
      "training_curve/curve_training_error_k_4.pdf",
      "training_curve/curve_training_error_k_5.pdf",
    ],
  };

  try {
    const teste = await Promise.all(
      Object.entries(filesCategories).map(async ([key, files]) => {
        const responses = await downloadFiles(files, processingId);
        const urls = createUrls(responses);
        return [key, urls];
      })
    );
    //console.log(Object.fromEntries(teste));

    return Object.fromEntries(teste);
    //return urls;
  } catch (error) {
    console.error("Failed to processing result:", error);
  }
};

/*
Pegar de todas as dobras(Ideia: COLOCAR UM CARROSEL DAS DOBRAS)

"synthetic_data_fold_5.csv" dataset para baixar pro pc

Dados para serem exibidas:
Comparison_Real_Synthetic.pdf
KNN_Real.pdf
KNN_Synthetic.pdf
confusion_matrix/CM_Real_KNN_k5.pdf
confusion_matrix/CM_Synthetic_KNN_k5.pdf
training_curve/curve_training_error_k_5.pdf */
