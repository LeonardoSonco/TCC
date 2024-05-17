import { Eye, EyeOff, Trash } from "react-feather";
import { Campaign, ListCampaing } from "../../types";
import { useState } from "react";

const PredefinitionCampaing = ({ listCampaings }: any) => {

    const [visibleCampaings, setVisibleCampaings] = useState<{ [key: string]: boolean }>({});
   
    const renderParametersCampaignSelected = (campaign: Campaign) => {
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

    const handleRemoveCampaing = (name: string) => {
        console.log("REMOVER A CAMPANHA :", name)
    }

    const toggleVisibility = (index: number) => { // atualiza o estado especifico do objeto que vai ser mostrado
        setVisibleCampaings(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    return <div>

        {listCampaings.length > 0 ? (
            <>
                {listCampaings.map((value: any, index: number) => (
                    <div className="border-2 mb-2 mx-4 p-2">
                        <div key={index} className=" flex justify-between">
                            <h2>{value.name}</h2>

                            <div className="flex gap-2">
                                {!visibleCampaings[index] ? (
                                    <Eye size={20} onClick={() => toggleVisibility(index)} className="cursor-pointer"></Eye>
                                ) : (
                                    <EyeOff size={20} onClick={() => toggleVisibility(index)} className="cursor-pointer"></EyeOff>
                                )}
                                <Trash size={20} onClick={() => handleRemoveCampaing(value.name)} className="cursor-pointer" />
                            </div>
                        </div>
                        {visibleCampaings[index] && (renderParametersCampaignSelected(value.parameters))}
                    </div>
                ))}

                <div className="text-center mt-10">
                    <button

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
    </div >
}


export default PredefinitionCampaing;