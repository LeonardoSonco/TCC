import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Parameters from "../../components/Parameters";
import { ListCampaing } from "../../types";
import PredefinitionCampaing from "../../components/PredefinitionCampaing";
import { registerUser } from "../../services/services";
import ProcessStatus from "../../components/ProcessStatus";

const ExecutionPage: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>("");
  const [listCampaigns, setListCampaigns] = useState<ListCampaing[]>([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
    } else {
      console.log(currentUserId);
    }
  }, []); // Executa apenas uma vez após a montagem do componente

  const handleRegisterUser = async () => {
    await registerUser();
    setCurrentUserId(sessionStorage.getItem("userId"));
  };

  return (
    <>
      {sessionStorage.getItem("userId") ? (
        <>
          <Header isExecutionEnvironment={true} />
          <section className="mx-10 mb-10">
            {currentUserId ? (
              <p className="mb-8 font-semibold">
                ID do Usuário: {currentUserId}
              </p>
            ) : (
              <p>Carregando... </p>
            )}

            <div className="grid grid-cols-3  max-lg:flex max-lg:flex-col max-lg:justify-center">
              <div className="col-span-2 shadow-shadowBox rounded-xl justify-self-center max-lg:max-w-max  max-lg:m-auto">
                <div className="flex flex-col justify-center items-center px-10">
                  <div className="pt-5 w-full flex justify-center">
                    <h3 className="font-bold text-xl  max-sm+:pl-0 max-xs:text-lg">
                      Parâmetros de Treinamento
                    </h3>
                  </div>
                  <Parameters
                    listCampaings={listCampaigns}
                    setListCampaignsList={setListCampaigns}
                  />
                </div>
              </div>

              <div className="mr-20 min-w-80 max-lg:max-w-lg max-lg:mx-auto max-lg:w-11/12 max-lg:mt-10 max-lg:min-w-44">
                <div className="w-full h-7 pl-4 bg-black flex items-end rounded-t-xl">
                  <h4 className="text-white font-semibold text-lg">
                    Predefinição de parâmetros{" "}
                  </h4>
                </div>

                <div className="shadow-shadowBox rounded-xl rounded-t-none h-5/6 py-5  ">
                  <PredefinitionCampaing
                    listCampaings={listCampaigns}
                    setListCampaigns={setListCampaigns}
                  />

                  <div className="text-center"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-10 ">

            <ProcessStatus />
            <ProcessStatus />
          </section>

          <Footer />
        </>
      ) : (
        <>
          <div className="col-span-2 shadow-shadowBox rounded-xl justify-self-center ">
            <div className="flex flex-col justify-center items-center px-10">
              <div>
                <p>Nenhum usuáiro foi criado!</p>{" "}
                <p>Para seguir é necessario um usuario</p>
                <button className="border-2" onClick={handleRegisterUser}>
                  Registra-se
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ExecutionPage;
