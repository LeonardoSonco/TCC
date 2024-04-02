import { useEffect, useState } from "react";
import ParametersComponent from "../../components/Parameters";

const ExecutionPage: React.FC = () => {
  
  const [jsonData, setJsonData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./parameters.json", {
          headers: {
            accept: "application/json",
            "User-agent": "learning app",
          },
        });
        const data = await response.json();

        setJsonData(data);
      } catch (error) {
        console.error("Erro ao buscar JSON:", error);
      }
    };

    fetchData();
  }, []);

  // Função para manipular a alteração dos valores dos parâmetros
  const handleParameterChange = (
    parameter: any,
    value: number
  ) => {
    setJsonData((prevData: any) => ({
        ...prevData,
        [parameter.label]: [{...parameter , value: value }],
      }));
    };
  


  // Função para lidar com o envio dos valores para a API
  const handleSubmit = () => {
    // Faça a chamada da API passando os valores de parameterValues
    console.log("Valores enviados para a API:", jsonData);
    // Aqui você pode usar uma biblioteca como axios para fazer a chamada da API
  };

  return (
    <div>
      <h1>Parâmetros de Treinamento</h1>

   

      {jsonData && Object.keys(jsonData).map((key: string) => // Object.keys(jsonData) retorna as chaves do objeto jsonData como um array, que então é mapeado para renderizar os componentes ParametersComponent
      jsonData[key].map((parameter: any) => (
            <ParametersComponent
              key={parameter.label} // Certifique-se de ter uma chave única para cada componente na iteração
              label={parameter.label}
              onChange={(valueParameters) =>
                handleParameterChange(parameter, valueParameters)
              }
            />
          ))
        )}
   

      {/* Botão para enviar os valores para a API */}
      <button onClick={handleSubmit}>Enviar para API</button>
    </div>
  );
};

export default ExecutionPage;
