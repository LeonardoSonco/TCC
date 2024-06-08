import { useEffect, useState } from "react";
import PrivateLayout from "../../layouts/Private";
import { processingShowResult } from "../../services/services";

import PdfDocument from "../../components/PdfViewerImage";

import { pdfjs } from "react-pdf";
import { ArrowLeftCircle, Download } from "react-feather";
import { useParams } from "react-router";
import { Box, CircularProgress } from "@mui/material";
import { ProcessingResultType } from "../../types";

import Carousel from "../../components/Carousel";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ResultPage = () => {
  const processingId = useParams<{ name: string; id: string }>();
  const [files, setFiles] = useState<ProcessingResultType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleFile = async () => {
      setIsLoading(true);

      if (processingId.id) {
        const result = await processingShowResult(processingId.id);
        if (result) {
          setFiles(result);
          setIsLoading(false);
        }
      }
      //setIsLoading(false);
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
          <section className="flex flex-col justify-center items-center w-screen">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-4">
                {" "}
                <ArrowLeftCircle
                  size={35}
                  onClick={() => window.history.back()}
                  className="cursor-pointer"
                />
                <h2 className="text-xl font-semibold">
                  Resultado do treinamento: {processingId.name}
                </h2>
              </div>

              <div className="flex gap-4 items-center cursor-pointer">
                <span>Baixar dataset</span>
                <Download></Download>
              </div>
            </div>

            <div className="max-w-4xl mx-5 my-4 mt-10">
              <h3 className="font-bold"> Curva de Treinamento</h3>
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
              <h3 className="font-bold">Métricas de Similaridade</h3>
              <p className="px-2">
                Essas métricas permitem verificar se os dados gerados são
                diferentes dos dados originais e, ao mesmo tempo, seguem o mesmo
                padrão estatístico.
              </p>
            </div>
            <PdfDocument pdfFile={files.fileComparison[0]}></PdfDocument>

            <div className="max-w-4xl mx-5 my-4 mt-10">
              <h3 className="font-bold">Métricas de Aplicabilidade</h3>
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
              <h3 className="font-bold">Matrizes de Confusão</h3>
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
