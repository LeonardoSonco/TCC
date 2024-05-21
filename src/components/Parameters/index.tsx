import React, { ChangeEvent, useEffect, useState } from "react";
import FormInput from "../FormInput/";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Campaign, ListCampaing } from "../../types";

interface Campaigns {
  [key: string]: Campaign;
}

const defaultCampaign: Campaign = {
  verbosity: "0",
  dense_layer_sizes_g: "0",
  dense_layer_sizes_d: "0",
  number_epochs: "0",
  training_algorithm: "0",
  datasetSelected: new Blob([], { type: "application/octet-stream" }),
};

const Parameters = ({ listCampaigns, setListCampaignsList }: any) => {
  const [campaigns, setCampaigns] = useState<Campaigns | null>(null); // campanhas que estão no json
  const [campaignSelected, setCampaignSelected] = useState<string>(""); // campanha que foi selecionado no select

  /*
    
        const [listCampaignsList, setListCampaignsList] = useState<
            ListCampaing[]
        >([]); // lista de campanha que o usuario quer processar
    */

  const [customParametersCampaing, setCustomParametersCampaing] =
    useState<Campaign>(defaultCampaign);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./campaigns.json", {
          headers: {
            accept: "application/json",
            "User-agent": "learning app",
          },
        });
        const data: Campaigns = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Erro ao buscar JSON:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCampaignSelected(event.target.value);

    if (event.target.value != "customize" && campaigns) {
      setCustomParametersCampaing(campaigns[event.target.value]);
    } else if (event.target.value === "customize" && campaigns) {
      setCustomParametersCampaing(defaultCampaign);
    }
  };

  const handleAddCampaign = () => {
    if (campaigns && campaignSelected) {
      const campaignList = {
        name: campaignSelected,
        parameters: customParametersCampaing,
      };

      setListCampaignsList((prevList: any) => [...prevList, campaignList]);
    }
  };

  const handleInputChange = (event: any, params: string) => {
    setCustomParametersCampaing((prevParams) => ({
      ...prevParams,
      [params]: event,
    }));
  };

  const renderInputParametersCampaign = (campaign: Campaign) => {
    return (
      <>
        {Object.entries(campaign).map(([subKey, subValue]) => {
          if (subKey !== "datasetSelected") {
            return (
              <FormInput
                key={subKey}
                label={subKey.replace(/_/g, " ")}
                onChange={(newValue) => {
                  handleInputChange(newValue.toString(), subKey);
                }}
                value={subValue}
                description={"parameter.descritpion"}
              />
            );
          } else {
            return null; // Não renderiza o datasetSelected
          }
        })}
      </>
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      setCustomParametersCampaing((prevCampaing) => ({
        ...prevCampaing,
        datasetSelected: file,
      }));
    }
  };

  return (
    <div className="flex gap-20 items-center my-10">
      <div>
        {campaigns ? (
          <>
            <div className="flex justify-between items-center">
              <h4 className="mr-3 px-1 font-bold">Campanhas Disponíveis</h4>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  maxWidth: 128,
                  margin: 0,
                  marginY: 1,
                }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">Campanha</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={campaignSelected}
                  label="Campanhas"
                  onChange={(event: any) => handleSelectChange(event)}
                  className="h-10"
                >
                  {Object.keys(campaigns).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {campaignSelected &&
              renderInputParametersCampaign(customParametersCampaing)}
            <div className="my-10">
              <form className={``}>
                <label className="text-base font-medium" htmlFor="fileInput">
                  Carregue seu conjunto de dados
                </label>
                <input
                  className="block text-sm w-full text-stone-500 border-2 rounded-md mt-2 border-black_button file:text-base file:px-6 file:py-1 file:border-[0px] file:bg-black_button file:text-white file:font-medium    max-xs:file:px-1 max-xs:file:text-sm"
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                />

                <div className="mt-1 text-sm text-gray-500">
                  Tipos de extensão: .xlsx .xls .csv
                </div>
              </form>
            </div>

            <div className="text-center">
              <button
                onClick={handleAddCampaign}
                className="border-2 bg-black_button text-white w-72 py-2 text-xl font-bold rounded-2xl max-xs:w-3/4 max-xs:text-lg"
              >
                Adicionar Predefinição
              </button>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Parameters;

/*
<div className="text-center mb-10">
    <button
        onClick={handleSubmit}
        className="border-2 bg-black_button text-white w-72 py-2 text-xl font-bold rounded-2xl max-xs:w-3/4 max-xs:text-lg"
    >
        Iniciar
    </button>
</div>
*/

/*
 AQUI MOSTRA TODOS AS CAMPANHAS QUE FORAM SELECIONADAS
 <div>
                {listCampaignsList.length > 0 ? (
                    listCampaignsList.map((value, index) => (
                        <div key={index} className="border-2 mb-2">
                            <h2>{value.name}</h2>
                            {renderParametersCampaignSelected(value.parameters)}
                        </div>
                    ))
                ) : (
                    <>
                        <p>Sem campanhas selecionadas</p>
                    </>
                )}
            </div>


*/
