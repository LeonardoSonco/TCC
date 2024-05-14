import React, { ChangeEvent, useEffect, useState } from "react";

interface Campaign {
  verbosity: string;
  dense_layer_sizes_g: string;
  dense_layer_sizes_d: string;
  number_epochs: string;
  training_algorithm: string;
}

interface ListCampaing {
  name: string;
  parameters: Campaign;
}

interface Campaigns {
  [key: string]: Campaign;
}

const defaultCampaign: Campaign = {
  verbosity: "0",
  dense_layer_sizes_g: "0",
  dense_layer_sizes_d: "0",
  number_epochs: "0",
  training_algorithm: "0",
};

const CampanhaDemo = () => {
  const [campaigns, setCampaigns] = useState<Campaigns | null>(null); // campanhas que estão no json
  const [selectedCampaign, setSelectedCampaign] = useState<string>(""); // campanha que foi selecionado no select
  const [selectedCampaignsList, setSelectedCampaignsList] = useState<
    ListCampaing[]
  >([]); // A lista de campanha que o usuario quer processar
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
        //console.log("Dados recebidos do JSON:", data);
        setCampaigns(data);
      } catch (error) {
        console.error("Erro ao buscar JSON:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCampaign(event.target.value);

    if (event.target.value != "customize" && campaigns) {
      setCustomParametersCampaing(campaigns[event.target.value]);
    } else if (event.target.value === "customize" && campaigns) {
      setCustomParametersCampaing(defaultCampaign);
    }
  };

  const handleAddCampaign = () => {
    if (campaigns && selectedCampaign) {
      //console.log("Name:", selectedCampaign);
      //console.log("Details:", campaigns[selectedCampaign]);
      console.log("Customs Parameters:", customParametersCampaing);

      const campaignList = {
        name: selectedCampaign,
        parameters: customParametersCampaing,
      };

      setSelectedCampaignsList((prevList) => [...prevList, campaignList]);
    }
  };

  const renderCampaignParameters = (campaign: Campaign) => {
    return (
      <div>
        {Object.entries(campaign).map(([subKey, subValue]) => (
          <p key={subKey}>
            {subKey.replace(/_/g, " ")}: {subValue}
          </p>
        ))}
      </div>
    );
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    params: string
  ) => {
    //console.log(`${params}: ${event.target.value}`)

    setCustomParametersCampaing((prevParams) => ({
      ...prevParams,
      [params]: event.target.value,
    }));
  };

  const renderCampaignParametersChange = (campaign: Campaign) => {
    return (
      <>
        <div>
          {Object.entries(campaign).map(([subKey, subValue]) => (
            <div key={subKey} className="flex justify-between">
              <span>{subKey.replace(/_/g, " ")}</span>
              <input
                className="border-2 w-16 ml-4"
                type="text"
                value={subValue}
                onChange={(event) => {
                  handleInputChange(event, subKey);
                }}
              />
            </div>
          ))}
        </div>
      </>
    );
  };
  // console.log(selectedCampaignsList);
  return (
    <div className="flex gap-20 items-center my-10">
      <div>
        <h1 className="text-2xl font-bold">Campanhas Disponíveis</h1>
        {campaigns ? (
          <>
            <div className="flex flex-col">
              <select
                name="campaigns"
                id="campaigns"
                value={selectedCampaign}
                onChange={handleSelectChange}
                className="h-10 text-xl"
              >
                <option value="">Campanhas</option>
                {Object.keys(campaigns).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <button
                className="border-2 my-4 text-xl bg-green-500 font-bold"
                onClick={handleAddCampaign}
              >
                Adicionar
              </button>
            </div>

            {renderCampaignParametersChange(customParametersCampaing)}
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>

      <div>
        {selectedCampaignsList.length > 0 ? (
          selectedCampaignsList.map((value, index) => (
            <div key={index} className="border-2 mb-2">
              <h2>{value.name}</h2>
              {renderCampaignParameters(value.parameters)}
            </div>
          ))
        ) : (
          <>
            <p>Sem campanhas selecionadas</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CampanhaDemo;
/*
   {selectedCampaign &&
              campaigns[selectedCampaign] &&
              renderCampaignParameters(campaigns[selectedCampaign])} */
