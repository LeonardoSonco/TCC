import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RefreshCw } from "react-feather";
import Logo from "../../assets/img/logoFaviconDark.svg";

import PrivateLayout from "../../layouts/Private";
import Parameters from "../../components/Parameters";
import PredefinitionCampaing from "../../components/PredefinitionCampaing";
import ProcessStatus from "../../components/ProcessStatus";

import { processingStatusToId, registerUser } from "../../services/services";

import { ListCampaing } from "../../types";

const TrainingPage: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>("");
  const [listCampaigns, setListCampaigns] = useState<ListCampaing[]>([]);
  const [processStatus, setProcessStatus] = useState<any>();
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
    } else {
      console.log(currentUserId);
    }
  }, []); // Executa apenas uma vez após a montagem do componente

  const handleRegisterUser = async () => {
    await registerUser();
    setCurrentUserId(localStorage.getItem("userId"));
  };

  const handleReloadProcessStatus = async () => {
    setIsSpinning(true);

    setTimeout(async () => {
      setIsSpinning(false);
      setProcessStatus(await processingStatusToId());
    }, 1000);
  };

  return (
    <>
      {localStorage.getItem("userId") ? (
        <PrivateLayout>
          <section className="mx-16 mb-10">
            {currentUserId ? (
              <p className="mb-8 font-semibold">
                ID do Usuário: {currentUserId}
              </p>
            ) : (
              <p>Carregando... </p>
            )}

            <div className="flex justify-around gap-4 max-sm+:flex max-sm+:flex-col max-sm+:justify-center">
              <div className="shadow-shadowBox rounded-xl justify-self-center max-sm+:w-11/12 max-sm+:max-w-lg max-sm+:mx-auto">
                <div className="flex flex-col justify-center items-center px-10">
                  <div className="pt-5 w-full flex justify-center">
                    <h3 className="font-bold text-xl  max-sm+:pl-0 max-xs:text-lg">
                      Parâmetros de Treinamento
                    </h3>
                  </div>
                  <Parameters setListCampaignsList={setListCampaigns} />
                </div>
              </div>

              <div className=" flex flex-col justify-center min-w-96  max-sm+:max-w-lg max-sm+:mx-auto max-sm+:w-11/12 max-sm+:mt-10 max-sm+:min-w-44">
                <div className="w-full h-7 pl-4 bg-black flex items-end rounded-t-xl">
                  <h4 className="text-white font-semibold text-lg">
                    Predefinição de parâmetros{" "}
                  </h4>
                </div>

                <div className="shadow-shadowBox rounded-xl rounded-t-none h-5/6 py-5 min-h-96">
                  <PredefinitionCampaing
                    listCampaings={listCampaigns}
                    setListCampaigns={setListCampaigns}
                  />

                  <div className="text-center"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="shadow-shadowBox rounded-lg max-w-7xl mx-auto pb-4">
            <div className="flex justify-between pt-8 pb-4 mx-12 ">
              <h3 className="font-bold text-xl">Processos</h3>
              <RefreshCw
                onClick={handleReloadProcessStatus}
                className={`cursor-pointer ${isSpinning ? "animate-spin" : ""}`}
              ></RefreshCw>
            </div>

            {processStatus ? (
              <>
                {Object.entries(processStatus).map(([name, result]: any) => {
                  return result.map((process: any, index: number) => {
                    return (
                      <ProcessStatus
                        key={`${name}-${index}`}
                        name={name}
                        processStatus={process}
                      />
                    );
                  });
                })}
              </>
            ) : (
              <div className="flex justify-center mb-5 ">
                <p className="font-semibold">Sem processos no momento! </p>
              </div>
            )}
          </section>
        </PrivateLayout>
      ) : (
        <>
          <div className="max-w-max flex justify-center items-center mx-auto h-screen">
            <div className="flex flex-col justify-center items-center p-5 px-10 shadow-shadowBox rounded-xl ">
              <div className="flex flex-col justify-center gap-2 items-center">
                <Link to="/">
                  {" "}
                  <div className="flex items-center text-xl font-semibold">
                    <img src={Logo} alt="" className="w-12" />
                    <h2>MalwareDatalab</h2>
                  </div>
                </Link>
                <p className="text-lg font-semibold">
                  Nenhum usuário foi criado!
                </p>{" "}
                <p className="mb-2">Para seguir é necessario um usuário</p>
                <button
                  onClick={handleRegisterUser}
                  className="border-2 bg-black_button text-white w-10/12 py-1 text-xl font-bold rounded-2xl max-xs:w-3/4 max-xs:text-lg"
                >
                  Registrar-se
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default TrainingPage;
