import axios, { AxiosResponse } from "axios";

export const postDatasetProcessing = async (
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
    console.error("Falha ao iniciar o processo:", error);
  }
};
