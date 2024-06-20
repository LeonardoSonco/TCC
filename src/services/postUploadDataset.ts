import axios, { AxiosResponse } from "axios";
import { postDatasetProcessing } from "./postDatasetProcessing";

export const postUploadDataset = async (campaingParameters: any, index: number) => {
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
  
      await postDatasetProcessing(campaingParameters, response.data.id);
  
      datasetIds.push(response.data.id);
  
      localStorage.setItem("datasetIds", JSON.stringify(datasetIds));
    } catch (error) {
      console.error("Falha ao enviar o dataset:", error);
    }
  };
  