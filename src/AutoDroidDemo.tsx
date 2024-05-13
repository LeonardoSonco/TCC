import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";



const AutoDroidDemo = () => {
  const [processorId, setProcessorId] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const registerUser = async () => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "/api/user/register"
      );

      if (!response.data.id) {
        throw new Error("Failed to register user");
      }

      const USER_ID = response.data.id;
      console.log(`User registered with id: ${USER_ID}`);
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  const showProcessors = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get("/api/processor");

      if (!response.data) {
        throw new Error("Failed to get processors");
      }

      response.data.map((processor: { code: any }) => {
        console.log(processor.code);
      });
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  const uploadDataset = async () => {
    try {
      if (!selectedFile) {
        console.error("Nenhum arquivo selecionado");
        return;
      }
      console.log("teste", selectedFile);

      const formData = new FormData();
      formData.append("dataset", selectedFile);
      formData.append("description", "Teste de carregameto do dataset");

      const response: AxiosResponse<any> = await axios.post(
        "/dataset",
        formData,
        {
          headers: {
            Authorization: `Bearer 4faa2a6c-524c-4bac-a2be-2f7eba37ba65`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Se a resposta do servidor for bem-sucedida, você pode retornar os dados relevantes
      console.log("Id do Dataset:" + response.data.id);
    } catch (error) {
      // Se houver algum erro, você pode capturar e tratar aqui
      console.error("Failed to upload dataset:", error);
    }
  };

  const datasetProcessing = async () => {
    const requestData = {
      dataset_id: "b97ef17e-957a-476c-996b-ff8cf55177ea",
      processor: "droidaugmentor",
      params: {
        verbosity: "20",
        dense_layer_sizes_g: "256",
        dense_layer_sizes_d: "256",
        number_epochs: "1000",
        training_algorithm: "Adam",
      },
    };
    try {
      const response: AxiosResponse<any> = await axios.post(
        "/processing",
        requestData,
        {
          headers: {
            Authorization: `Bearer 4faa2a6c-524c-4bac-a2be-2f7eba37ba65`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fazendo o processamento:", response.data);
      setProcessorId(response.data.id);
    } catch (error) {
      console.error("Failed to processing dataset:", error);
    }
  };

  const processingStatusToId = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `/processing/${processorId}`,
        {
          headers: {
            Authorization: `Bearer 4faa2a6c-524c-4bac-a2be-2f7eba37ba65`,
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
      const response = await axios.get(`/processing/f3956812-eb9d-4af4-ac4c-86bbd89eae18`, {
        headers: {
          Authorization: `Bearer 4faa2a6c-524c-4bac-a2be-2f7eba37ba65`,
        },
      });

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

  const readUploadedFileAsText = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Falha ao ler o conteúdo do arquivo"));
        }
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsText(file);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-2xl">AutoDroid Demo</h1>
      <button
        className="border-2 bg-green-500 font-bold text-xl p-2"
        onClick={registerUser}
      >
        1 - Registrar Usuario
      </button>
      <button
        className="border-2 bg-green-500 font-bold text-xl p-2"
        onClick={showProcessors}
      >
        2 - Mostrar Processos
      </button>
      <div className="flex flex-col gap-4 border-2 p-4">
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button
          className="border-2 bg-green-500 font-bold text-xl p-2"
          onClick={uploadDataset}
        >
          3 - Carregar dataset
        </button>
      </div>

      <button
        className="border-2 bg-green-500 font-bold text-xl p-2"
        onClick={datasetProcessing}
      >
        4 - Solicitar processamento do dataset
      </button>

      <button
        className="border-2 bg-green-500 font-bold text-xl p-2"
        onClick={processingStatusToId}
      >
        5 - Obtenha o status do processamento
      </button>

      <button
        className="border-2 bg-green-500 font-bold text-xl p-2"
        onClick={processingResult}
      >
        6 - Obtenha os resultados do processamento
      </button>
    </div>
  );
};

export default AutoDroidDemo;
//9432f568-9864-4ff8-a2bd-614c081e3c54
