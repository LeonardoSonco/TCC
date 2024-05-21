import axios, { AxiosResponse } from "axios";

export const registerUser = async () => {
  try {
    if (!sessionStorage.getItem("userId")) {
      const response: AxiosResponse<any> = await axios.post(
        "/api/user/register"
      );

      if (!response.data.id) {
        throw new Error("Failed to register user");
      }

      const userId = response.data.id;

      console.log(`User registered with id: ${userId}`);
      sessionStorage.setItem("userId", userId);
    } else {
      alert(`USUARIO CRIADO COM O ID ${sessionStorage.getItem("userId")}`);
    }
  } catch (error) {
    console.error("Failed to register user:", error);
  }
};

export const uploadDataset = async (campaingParameters: any, index: number) => {
  try {
    if (!campaingParameters.datasetSelected) {
      console.error("Nenhum arquivo selecionado");
      return;
    }
    if (index.toString() === "0") {
      sessionStorage.removeItem("datasetIds");
    }

    const datasetIdsJson = sessionStorage.getItem("datasetIds");
    const datasetIds: string[] = datasetIdsJson
      ? JSON.parse(datasetIdsJson)
      : []; // converte string json para um array de strings

    const formData = new FormData();
    formData.append("dataset", campaingParameters.datasetSelected);
    formData.append(
      "description",
      ` (${index + 1})${campaingParameters.datasetSelected.name}`
    );

    const response: AxiosResponse<any> = await axios.post(
      "/api/dataset",
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Id do Dataset:" + response.data.id);

    await datasetProcessing(campaingParameters, response.data.id);

    datasetIds.push(response.data.id);
    console.log(datasetIds);

    sessionStorage.setItem("datasetIds", JSON.stringify(datasetIds));
  } catch (error) {
    console.error("Failed to upload dataset:", error);
  }
};

const datasetProcessing = async (
  campaingParameters: any,
  datasetId: string
) => {
  const { datasetSelected, ...parameters } = campaingParameters;

  const requestData = {
    dataset_id: datasetId,
    processor: "droidaugmentor",
    params: parameters,
  };

  const processIdsJson = sessionStorage.getItem("processIds");
  const processIds: string[] = processIdsJson ? JSON.parse(processIdsJson) : []; // converte string json para um array de strings

  try {
    const response: AxiosResponse<any> = await axios.post(
      "/api/processing",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Fazendo o processamento:", response.data);
    console.log("Id do processo:", response.data.id);
    processIds.push(response.data.id);
    sessionStorage.setItem("processIds", JSON.stringify(processIds));
    console.log(requestData);
  } catch (error) {
    console.error("Failed to processing dataset:", error);
  }
};

/*

 {
      verbosity: "20",
      dense_layer_sizes_g: "256",
      dense_layer_sizes_d: "256",
      number_epochs: "1000",
      training_algorithm: "Adam",
    }
*/

export const processingStatusToId = async () => {
  try {
    
    const processosIds = (sessionStorage.getItem("processIds"))?.replace(/[\[\]"]+/g, '')
    console.log(processosIds)
    //${(sessionStorage.getItem("userId"))?.replace(/[\[\]"]+/g, '') }
    const response: AxiosResponse<any> = await axios.get(
      `/api/processing/${processosIds}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
        },
      }
    );
    console.log("Status do processo:", response.data.processing);
  } catch (error) {
    console.error("Failed to processing status:", error);
  }
};

const processingResult = async () => {
  try {
    //const processingId = "f3956812-eb9d-4af4-ac4c-86bbd89eae18"; // Substitua pelo ID do processamento

    const response = await axios.get(
      `/api/processing/${sessionStorage.getItem("processIds")}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userId")}`,
        },
      }
    );

    console.log("Resultados:", response.data);
    const files = response.data.processing.files;
    console.log("Resultados:");
    files.forEach((file: any) => {
      console.log(file);
    });
  } catch (error) {
    console.error("Failed to processing result:", error);
  }
};
