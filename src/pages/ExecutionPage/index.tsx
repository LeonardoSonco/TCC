import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import StringTypeParameters from "../../components/Parameters/String";
import BooleanTypeParameters from "../../components/Parameters/Boolean";
import NumericTypeParameters from "../../components/Parameters/Numeric";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Info } from "react-feather";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import style from "./index.module.css";


import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ExecutionPage: React.FC = () => {
  const [parameterNumeric, setParameterNumeric] = useState<any>();

  const [currentUserId, setCurrentUserId] = useState<string | null>("")

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
    }
  }, []); // Executa apenas uma vez após a montagem do componente


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

      } catch (error) {
        console.error("Erro ao buscar JSON:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./teste.json", {
          headers: {
            accept: "application/json",
            "User-agent": "learning app",
          },
        });
        const data = await response.json();
        console.log("Dados recebidos do JSON:", data.sf23_1l_64);
        //setParameterNumeric(data.NumericParameters);
        //const jsonString = JSON.stringify(data.sf23_1l_64); // tranformando em json
        //console.log("Objeto sf23_1l_64 como JSON:", jsonString);

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



  // Função para lidar com o envio dos valores para a API
  const handleSubmit = () => {
    // Faz a chamada da API passando os valores de parameterValues
    console.log("Valores enviados para a API:", parameterNumeric);

    //Usar uma biblioteca como axios para fazer a chamada da API
  };

  return (
    <>
      <Header isExecutionEnvironment={true} />
      <section className="mx-10  max-sm+:mx-4">
        <p>Identificador do Usuário: {currentUserId}</p>
        <div className=" shadow-shadowBox rounded-xl max-w-6xl mx-auto py-5">
          <div className=" grid grid-cols-2 justify-items-center max-w-6xl px-10 max-sm+:flex max-sm+:flex-col max-sm+:justify-center max-sm+:items-center ">
            <div className="py-5 w-full col-span-2 flex justify-start max-sm+:justify-center max-xs:text-center">
              <h3 className="font-bold text-xl pl-20 max-sm+:pl-0 max-xs:text-lg">
                Parâmetros de Treinamento
              </h3>
            </div>
            <div className={`flex items-center py-1 justify-between ${style.size} max-xs:flex-col`}>
              <div className="flex items-center">
                <Tooltip
                  TransitionComponent={Zoom}
                  title={"descritpion"}
                  placement="top-start"
                  arrow
                >
                  <Info
                    size={20}
                    color="#FFFFFF"
                    fill="#001A1A"
                    className="font-bold"
                    strokeWidth={2.5}
                  />
                </Tooltip>

                <h4 className="mr-3 px-1 font-bold">Campanhas</h4>
              </div>
              <FormControl sx={{ minWidth: 104 }} size="small">

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={"chosenOption"}
                  label="Opções"

                >
                  <MenuItem value="Default">
                    <em>Default</em>
                  </MenuItem>
                  <MenuItem key={'key'} value={"key"}>
                    teste
                  </MenuItem>

                </Select>
              </FormControl>
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
