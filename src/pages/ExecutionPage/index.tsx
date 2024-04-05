import { useEffect, useState } from "react";

import StringTypeParameters from "../../components/Parameters/String";
import BooleanTypeParameters from "../../components/Parameters/Boolean";
import NumericTypeParameters from "../../components/Parameters/Numeric";
const ExecutionPage: React.FC = () => {
  const [parameterNumeric, setParameterNumeric] = useState<any | null>(null);
  const [parameterString, setParameterString] = useState<any | null>(null);
  const [parameterBoolean, setParameterBoolean] = useState<any | null>(null);

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
  const handleNumericParameterChange = (parameter: any, value: number) => {
    setParameterNumeric((prevData: any) => ({
      ...prevData,
      [parameter.label]: [{ ...parameter, value: value }],
    }));
  };

  const handleBooleanParameterChange = (parameter: any, active: boolean) => {
    setParameterBoolean((prevData: any) => ({
      ...prevData,
      [parameter.label]: [{ ...parameter, active: active }],
    }));
  };

  const handleStringParameterChange = (parameter: any, option: string) => {
    setParameterString((prevData: any) => ({
      ...prevData,
      [parameter.label]: [{ ...parameter, chosenOption: option }],
    }));
  };

  // Função para lidar com o envio dos valores para a API
  const handleSubmit = () => {
    // Faz a chamada da API passando os valores de parameterValues
    console.log("Valores enviados para a API:", parameterNumeric);
    console.log("Valores enviados para a API:", parameterBoolean);
    //Usar uma biblioteca como axios para fazer a chamada da API
  };

  return (
    <section className="mx-10  max-sm+:mx-4">
      <div className=" shadow-shadowBox rounded-xl max-w-6xl mx-auto py-5">
        <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10 max-sm+:flex max-sm+:flex-col max-sm+:justify-center max-sm+:items-center ">
          <div className="py-5 w-full col-span-2 flex justify-start max-sm+:justify-center max-xs:text-center">
            <h3 className="font-bold text-xl pl-20 max-sm+:pl-0 max-xs:text-lg">
              Parâmetros de Treinamento
            </h3>
          </div>

          {parameterNumeric &&
            Object.keys(parameterNumeric).map(
              (
                key: string // Object.keys(jsonData) retorna as chaves do objeto jsonData como um array, que então é mapeado para renderizar os componentes ParametersComponent
              ) =>
                parameterNumeric[key].map((parameter: any) => (
                  <NumericTypeParameters
                    key={parameter.label} // Certifique-se de ter uma chave única para cada componente na iteração
                    label={parameter.label}
                    onChange={(valueParameters) => {
                      handleNumericParameterChange(parameter, valueParameters);
                    }}
                    descritpion={parameter.descritpion}
                  />
                ))
            )}
        </div>
        <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10 max-sm+:flex max-sm+:flex-col max-sm+:justify-center max-sm+:items-center">
          {parameterBoolean &&
            Object.keys(parameterBoolean).map(
              (
                key: string // Object.keys(jsonData) retorna as chaves do objeto jsonData como um array, que então é mapeado para renderizar os componentes ParametersComponent
              ) =>
                parameterBoolean[key].map((parameter: any) => (
                  <BooleanTypeParameters
                    key={parameter.label} // Certifique-se de ter uma chave única para cada componente na iteração
                    label={parameter.label}
                    onChange={(valueParameters) =>
                      handleBooleanParameterChange(parameter, valueParameters)
                    }
                    descritpion={parameter.descritpion}
                  />
                ))
            )}
        </div>

        <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10 max-sm+:flex max-sm+:flex-col max-sm+:justify-center max-sm+:items-center">
          {parameterString &&
            Object.keys(parameterString).map(
              (
                key: string // Object.keys(jsonData) retorna as chaves do objeto jsonData como um array, que então é mapeado para renderizar os componentes ParametersComponent
              ) =>
                parameterString[key].map((parameter: any) => (
                  <StringTypeParameters
                    key={parameter.label} // Certifique-se de ter uma chave única para cada componente na iteração
                    label={parameter.label}
                    type={parameter.type}
                    onChange={(valueParameters) =>
                      handleStringParameterChange(parameter, valueParameters)
                    }
                    descritpion={parameter.descritpion}
                    options={parameter.options[0]}
                  />
                ))
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
  );
};
export default ExecutionPage;
/*input_dataset: Geralmente, é uma estrutura de dados que contém os exemplos de entrada para o modelo. O tipo de dados pode variar dependendo do tipo de problema e da natureza dos dados, podendo incluir arrays, tensores ou estruturas de dados específicas para o tipo de entrada, como imagens, áudio, texto, etc.

output_dir: É uma string que representa o diretório onde os resultados do treinamento e os modelos gerados serão armazenados.

data_type: É uma string que descreve o tipo de dados presente no conjunto de dados de entrada, como "imagem", "áudio", "texto", etc.

training_algorithm e activation_function: São strings que representam o algoritmo de treinamento e a função de ativação desejados, respectivamente.


num_samples_class_malware e num_samples_class_benign: Ambos esperam valores inteiros que representam o número de amostras pertencentes a cada classe (malware ou benigno) no conjunto de dados.

number_epochs, k_fold, latent_dimension, batch_size: Todos esses parâmetros esperam valores inteiros que representam o número de épocas de treinamento, o número de folds para validação cruzada, a dimensionalidade do espaço latente e o tamanho do lote de dados, respectivamente.

dense_layer_sizes_g e dense_layer_sizes_d: São listas de inteiros que representam os tamanhos das camadas densas (totalmente conectadas) para o gerador e o discriminador, respectivamente.


initializer_mean e initializer_deviation: Esperam valores numéricos, geralmente de ponto flutuante, que representam a média e o desvio padrão para inicialização dos pesos da rede neural.

dropout_decay_rate_g e dropout_decay_rate_d: Esperam valores numéricos (geralmente de ponto flutuante) que representam a taxa de decaimento do dropout para o gerador e o discriminador, respectivamente.


verbosity, save_models: Ambos são parâmetros booleanos que indicam se se deseja ou não exibir mensagens de progresso durante o treinamento e salvar os modelos treinados, respectivamente.

path_confusion_matrix e path_curve_loss: São strings que representam os caminhos onde a matriz de confusão e a curva de perda serão salvas durante o treinamento. */

/*

"Training Algorithm": [{
        "label": "Training Algorithm",
        "descritpion": "xxxxxxxxx",'
        "value": 0
    }],
    "Activation Function": [{
        "label": "Activation Function",
        "descritpion": "xxxxxxxxx",
        "value": 0

    "Verbosity": [{
        "label": "Verbosity",
        "descritpion": "Refere-se ao nível de detalhe das informações de progresso exibidas durante o treinamento do modelo.",
        "value": 0
    }]



    }],*/
