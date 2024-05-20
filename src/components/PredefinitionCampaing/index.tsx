import { Eye, EyeOff, Trash } from "react-feather";
import { Campaign, ListCampaing } from "../../types";
import { useState } from "react";
import { uploadDataset } from "../../services/services";

const PredefinitionCampaing = ({ listCampaings, setListCampaigns }: any) => {
  const [visibleCampaings, setVisibleCampaings] = useState<{
    [key: string]: boolean;
  }>({});

  const renderParametersCampaignSelected = (campaign: Campaign) => {
    return (
      <div>
        {Object.entries(campaign).map(([key, value]) => {
          if (typeof value === "object" && value) {
            return (
              <>
                <p>{value.name}</p>
              </>
            );
          } else {
            return (
              <>
                <p key={key}>
                  {key.replace(/_/g, " ")}: {value.toString()}
                </p>
              </>
            );
          }
        })}
      </div>
    );
  };

  const handleRemoveCampaing = (index: number) => {
    // faz a copia do array do array
    const updatedListCampaings = [...listCampaings];
    updatedListCampaings.splice(index, 1);

    // atualiza o estado com cópia do array
    setListCampaigns(updatedListCampaings);
  };

  const toggleVisibility = (index: number) => {
    // atualiza o estado especifico do objeto que vai ser mostrado

    setVisibleCampaings((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const handleUploadDatasets = () => {
    listCampaings.map((campaign: any,index:number) => {
      uploadDataset(campaign.parameters.datasetSelected,index);
    });
  };
  return (
    <div>
      {listCampaings.length > 0 ? (
        <>
          {listCampaings.map((value: any, index: number) => (
            <div className="border-2 mb-2 mx-4 p-2">
              <div key={index} className=" flex justify-between">
                <h2>{value.name}</h2>

                <div className="flex gap-2">
                  {!visibleCampaings[index] ? (
                    <Eye
                      size={20}
                      onClick={() => toggleVisibility(index)}
                      className="cursor-pointer"
                    ></Eye>
                  ) : (
                    <EyeOff
                      size={20}
                      onClick={() => toggleVisibility(index)}
                      className="cursor-pointer"
                    ></EyeOff>
                  )}
                  <Trash
                    size={20}
                    onClick={() => handleRemoveCampaing(index)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {visibleCampaings[index] &&
                renderParametersCampaignSelected(value.parameters)}
            </div>
          ))}

          <div className="text-center mt-10">
            <button
              onClick={handleUploadDatasets}
              className="border-2 bg-black_button text-white w-10/12 py-1 text-xl font-bold rounded-2xl max-xs:w-3/4 max-xs:text-lg"
            >
              Iniciar
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="ml-4">Sem campanhas selecionadas</p>
        </>
      )}
    </div>
  );
};

export default PredefinitionCampaing;
