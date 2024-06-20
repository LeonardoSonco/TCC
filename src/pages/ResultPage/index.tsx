import { ReactNode, useEffect, useState } from "react";
import PrivateLayout from "../../layouts/Private";


import PdfDocument from "../../components/PdfViewerImage";

import { pdfjs } from "react-pdf";
import { ArrowLeftCircle, Download } from "react-feather";
import { useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { ParametersDefault, ProcessingResultType } from "../../types";

import Carousel from "../../components/Carousel";
import ModalLoading from "../../components/ModalLoading";
import { processingShowResult } from "../../services/getProcessingShowResult";
import { getDownloadDataset } from "../../services/getDownloadDataset";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Parameters {
  [key: string]: ReactNode;
}

const ResultPage = () => {
  const processingId = useParams<{ name: string; id: string }>();
  const [files, setFiles] = useState<ProcessingResultType>();
  const [fileDonwload, setFileDonwload] = useState("");
  const [parameters, setParameters] = useState<Parameters>();
  const [parametersDefault, setParametersDefault] =
    useState<ParametersDefault>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/parametersDefault.json",
          {
            headers: {
              accept: "application/json",
              "User-agent": "learning app",
            },
          }
        );
        const data: ParametersDefault = await response.json();
        setParametersDefault(data);
      } catch (error) {
        console.error("Erro ao buscar JSON:", error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const handleFile = async () => {
      setIsLoading(true);

      if (processingId.id) {
        const result = await processingShowResult(processingId.id);
        const fileDonwload = await getDownloadDataset(processingId.id);
     
        if (result && result.imagesObject) {
          setFiles(result.imagesObject);
          setParameters(result.selectedResultParameters);
          setFileDonwload(fileDonwload.fileForDownload);
          setIsLoading(false);
        }
      }
      //setIsLoading(false);
      // Adicionar que deu errado o carregamento
    };

    handleFile();
  }, [processingId]);

  return (
    <PrivateLayout>
      {isLoading ? (
        <div className="flex justify-center">
          <Box sx={{ display: "flex", height: "80vh", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        files && (
          <section className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-4 mb-8">
              <div className="flex items-center gap-4 mx-4">
                {" "}
                <ArrowLeftCircle
                  size={35}
                  onClick={() => {
                    window.history.back();
                  }}
                  className="cursor-pointer hover:scale-105 hover:text-blue-400 hover:transition-all"
                />
                <h2 className="text-xl font-semibold">
                  Resultado do treinamento: {processingId.name}
                </h2>
              </div>

              <a
                className="flex gap-4 items-center cursor-pointer mt-2 hover:scale-101 hover:text-blue-400 hover:transition-all"
                download={`dataset_${processingId.name}.csv`}
                href={fileDonwload}
              >
                <span>Baixar dataset</span>
                <Download></Download>
              </a>
            </div>

            <div className="flex flex-col w-full max-w-4xl mx-auto max-sm++:w-11/12">
              <h3 className="font-bold text-xl mb-4">
                {" "}
                Configurações utilizadas
              </h3>

              <div className="bg-light_gray px-5 py-2 rounded-xl">
                <h4 className="font-medium text-lg">Parâmetros customizados</h4>
                <div className="px-4" key={"Parametros_customizados"}>
                  {parameters &&
                    Object.entries(parameters).map(([key, value]) => (
                      <>
                        <p key={`${key}-${value}`} className="py-1 font-light">
                          <span className="font-normal">{key}:</span> {value}
                        </p>
                      </>
                    ))}
                </div>

                <h4 className="mt-5 font-medium text-lg">Parâmetros fixos</h4>
                <div
                  className="grid grid-cols-2 px-4 max-sm:flex max-sm:flex-col"
                  key={"Parametros_fixos"}
                >
                  {parametersDefault &&
                    Object.entries(parametersDefault).map(([key, value]) => (
                      <>
                        <p key={`${key}-${value}`} className="py-1 font-light">
                          <span className="font-normal">{key}:</span> {value}
                        </p>
                      </>
                    ))}
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-5 my-4 mt-10">
              <h3 className="font-bold text-xl"> Curva de Treinamento</h3>
              <p className="px-2">
                A figura mostra a interação entre o gerador e o discriminador em
                uma cGAN durante o aprendizado. O gerador tenta criar amostras
                que enganem o discriminador, enquanto o discriminador melhora
                para distinguir entre real e falso. Essa competição leva à
                convergência, onde as amostras geradas ficam quase
                indistinguíveis dos dados reais. A não convergência das redes
                GAN pode ser detectada monitorando as curvas de perda, que devem
                diminuir e estabilizar ao longo do tempo.
              </p>
            </div>
            <Carousel fileOne={files.filesTrainingCurve}></Carousel>

            <div className="max-w-4xl mx-5 my-4">
              <h3 className="font-bold text-xl">Métricas de Similaridade</h3>
              <p className="px-2">
                Essas métricas permitem verificar se os dados gerados são
                diferentes dos dados originais e, ao mesmo tempo, seguem o mesmo
                padrão estatístico.
              </p>
            </div>
            <PdfDocument pdfFile={files.fileComparison[0]}></PdfDocument>

            <div className="max-w-4xl mx-5 my-4 mt-10">
              <h3 className="font-bold text-xl">Métricas de Aplicabilidade</h3>
              <p className="px-2">
                Ao verificar se os classificadores são capazes de classificar os
                dados sintéticos de maneira similar aos dados reais, pode-se
                inferir que os dados sintéticos são realistas e adequados.
              </p>
              <div className="flex justify-center items-center text-center gap-4 max-sm++:flex-col mt-4 ">
                <div>
                  <PdfDocument
                    pdfFile={files.fileKNN_Real[0]}
                    doubleImage={true}
                  ></PdfDocument>
                  <h3>KNN_Real</h3>
                </div>
                <div>
                  <PdfDocument
                    pdfFile={files.fileKNN_Synth[0]}
                    doubleImage={true}
                  ></PdfDocument>
                  <h3>KNN_Synthetic</h3>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-5 my-4 mt-10">
              <h3 className="font-bold text-xl">Matrizes de Confusão</h3>
              <p className="px-2">
                Ajuda a entender como o modelo está se saindo em relação a
                classificação das categorias de interesse, quanto mais parecidas
                com o real, maior é a qualidade dos dados.
              </p>
            </div>
            <Carousel
              fileOne={files.filesConfusionMatrixReal}
              fileTwo={files.filesConfusionMatrixSynthetic}
            ></Carousel>
          </section>
        )
      )}
    </PrivateLayout>
  );
};

export default ResultPage;
/*
 <div className="flex justify-center">
          <Box sx={{ display: "flex", height: "80vh", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        </div>
 */
