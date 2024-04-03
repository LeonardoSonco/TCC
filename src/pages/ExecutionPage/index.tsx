import { useEffect, useState } from "react";
import ParametersComponent from "../../components/Parameters";
import style from "./index.module.css";
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
  const handleParameterChange = (parameter: any, value: number) => {
    setJsonData((prevData: any) => ({
      ...prevData,
      [parameter.label]: [{ ...parameter, value: value }],
    }));
  };

  // Função para lidar com o envio dos valores para a API
  const handleSubmit = () => {
    // Faz a chamada da API passando os valores de parameterValues
    console.log("Valores enviados para a API:", jsonData);
    //Usar uma biblioteca como axios para fazer a chamada da API
  };

  return (
    <section className="mx-10">
      <div className=" shadow-shadowBox rounded-xl max-w-6xl mx-auto py-5">
        <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10">
          <div className="py-5 w-full col-span-2 flex justify-start">
            <h3 className="font-bold text-xl pl-20">
              Parâmetros de Treinamento
            </h3>
          </div>

          {jsonData &&
            Object.keys(jsonData).map(
              (
                key: string // Object.keys(jsonData) retorna as chaves do objeto jsonData como um array, que então é mapeado para renderizar os componentes ParametersComponent
              ) =>
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
        </div>
        {/* Botão para enviar os valores para a API */}

        <div className="my-10">
          <form className={`max-w-4xl mx-auto px-10`}>
            <label className="text-base font-medium" htmlFor="fileInput">
              Carregue seu conjunto de dados
            </label>
            <input
              className="block text-sm w-full text-stone-500 border-2 rounded-md mt-2 border-black_button file:text-base file:px-6 file:py-1 file:border-[0px] file:bg-black_button file:text-white file:font-medium"
              id="fileInput"
              type="file"
            />

            <div className="mt-1 text-sm text-gray-500">
              Tipos de extensão: .xlsx .xls .csv
            </div>
          </form>
        </div>
        <div className="text-center mb-10">
          <button
            onClick={handleSubmit}
            className="border-2 bg-black_button text-white w-72 py-2 text-xl font-bold rounded-2xl"
          >
            Iniciar
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExecutionPage;
