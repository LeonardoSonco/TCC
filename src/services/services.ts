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

export const uploadDataset = async (selectedFile: File,index: number) => {
  try {
    if (!selectedFile) {
      console.error("Nenhum arquivo selecionado");
      return;
    }
    const datasetIdsJson = sessionStorage.getItem('datasetIds');
    const datasetIds: string[] = datasetIdsJson ? JSON.parse(datasetIdsJson) : []; // converte string json para um array de strings



    
   


    const formData = new FormData();
    formData.append("dataset", selectedFile);
    formData.append("description", ` (${index+1})${selectedFile.name}` );
   
    /*
    const response: AxiosResponse<any> = await axios.post(
      "/api/dataset",
      formData,
      {
        headers: {
          Authorization: `Bearer e67bd3d9-cd5a-4fe8-8cb6-60e1d272b752`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Id do Dataset:" + response.data.id);*/
    datasetIds.push(index.toString());

    // Armazenar a lista atualizada de IDs no sessionStorage
    sessionStorage.setItem('datasetIds', JSON.stringify(datasetIds));
    
  } catch (error) {
    console.error("Failed to upload dataset:", error);
  }
};
