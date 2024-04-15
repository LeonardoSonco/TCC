import { useEffect, useState } from "react";

import StringTypeParameters from "../../components/Parameters/String";
import BooleanTypeParameters from "../../components/Parameters/Boolean";
import NumericTypeParameters from "../../components/Parameters/Numeric";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ExecutionPage: React.FC = () => {
  const [parameterNumeric, setParameterNumeric] = useState<any>();
  const [parameterString, setParameterString] = useState<any>();
  const [parameterBoolean, setParameterBoolean] = useState<any>();

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
        //console.log("Dados recebidos do JSON:", data);
        setParameterNumeric(data.NumericParameters);
        setParameterString(data.StringParameters);
        setParameterBoolean(data.BooleanParameters);
      } catch (error) {
        console.error("Erro ao buscar JSON:", error);
      }
    };

    fetchData();
  }, []);

  // Funçpes para manipular as alteraçoes dos valores dos parâmetros
  const handleNumericParameterChange = (label: string, newValue: number) => {
    setParameterNumeric((prevData: any) => ({
      ...prevData,
      [label]: { ...prevData[label], value: newValue },
    }));
  };

  const handleBooleanParameterChange = (label: string, active: boolean) => {
    setParameterBoolean((prevData: any) => ({
      ...prevData,
      [label]: [{ ...prevData[label], active: active }],
    }));
  };

  const handleStringParameterChange = (label: string, option: string) => {
    setParameterString((prevData: any) => {
      const updatedParameter = { ...prevData[label], chosenOption: option };
      return { ...prevData, [label]: updatedParameter };
    });
  };

  // Função para lidar com o envio dos valores para a API
  const handleSubmit = () => {
    // Faz a chamada da API passando os valores de parameterValues
    console.log("Valores enviados para a API:", parameterNumeric);
    console.log("Valores enviados para a API:", parameterBoolean);
    console.log("Valores enviados para a API:", parameterString);
    //Usar uma biblioteca como axios para fazer a chamada da API
  };

  return (
    <>
      <Header isExecutionEnvironment={true} />
      <section className="mx-10  max-sm+:mx-4">
        <div className=" shadow-shadowBox rounded-xl max-w-6xl mx-auto py-5">
          <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10 max-sm+:flex max-sm+:flex-col max-sm+:justify-center max-sm+:items-center ">
            <div className="py-5 w-full col-span-2 flex justify-start max-sm+:justify-center max-xs:text-center">
              <h3 className="font-bold text-xl pl-20 max-sm+:pl-0 max-xs:text-lg">
                Parâmetros de Treinamento
              </h3>
            </div>

            {parameterNumeric &&
              Object.entries(parameterNumeric).map(
                ([label, parameter]: [string, any]) => (
                  <NumericTypeParameters
                    key={label}
                    label={label}
                    onChange={(newValue) => {
                      handleNumericParameterChange(label, newValue);
                    }}
                    description={parameter.descritpion}
                  />
                )
              )}
          </div>
          <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10 max-sm+:flex max-sm+:flex-col max-sm+:justify-center max-sm+:items-center">
            {parameterBoolean &&
              Object.entries(parameterBoolean).map(
                ([label, parameter]: [string, any]) => (
                  <BooleanTypeParameters
                    key={label} // Certifique-se de ter uma chave única para cada componente na iteração
                    label={label}
                    onChange={(newValue) =>
                      handleBooleanParameterChange(label, newValue)
                    }
                    descritpion={parameter.descritpion}
                  />
                )
              )}
          </div>

          <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10 max-sm+:flex max-sm+:flex-col max-sm+:justify-center max-sm+:items-center">
            {parameterString &&
              Object.entries(parameterString || {}).map(
                ([label, parameter]: [string, any]) => (
                  <StringTypeParameters
                    key={label} // Certifique-se de ter uma chave única para cada componente na iteração
                    label={label}
                    type={parameter.type}
                    onChange={(newValue) =>
                      handleStringParameterChange(label, newValue)
                    }
                    descritpion={parameter.descritpion}
                    options={parameter.options}
                  />
                )
              )}
          </div>

          <div className="my-10">
            <form className={`max-w-4xl mx-auto px-10`}>
              <label className="text-base font-medium" htmlFor="fileInput">
                Carregue seu conjunto de dados
              </label>
              <input
                className="block text-sm w-full text-stone-500 border-2 rounded-md mt-2 border-black_button file:text-base file:px-6 file:py-1 file:border-[0px] file:bg-black_button file:text-white file:font-medium    max-xs:file:px-1 max-xs:file:text-sm"
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
              className="border-2 bg-black_button text-white w-72 py-2 text-xl font-bold rounded-2xl max-xs:w-3/4 max-xs:text-lg"
            >
              Iniciar
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default ExecutionPage;
