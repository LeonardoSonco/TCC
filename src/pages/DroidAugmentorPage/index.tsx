import fluxoDroidAugmentor from "../../assets/img/fluxo_droidaugmentor.png";
import PublicLayout from "../../layouts/Public";

export default function DroidAugmentorPage() {
  return (
    <PublicLayout>
      <section className=" w-7/12 flex flex-col gap-4 mx-auto mb-20 mt-10 max-lg:w-9/12 max-lg:max-sm:w-11/12 max-sm:text-justify">
        <div className="flex flex-col gap-4 ">
          <h3 className="font-bold text-xl max-sm:text-center">
            O que é o DroidAugmentor ?
          </h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              A DroidAugmentor utiliza cGANs para gerar dados sintéticos
              rotulados como benignos ou malignos, utilizando métricas de
              similaridade e aplicabilidade para avaliar sua qualidade.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl max-sm:text-center">
            Como funciona?
          </h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              Dado um conjunto de dados e de parâmetros de entrada, a
              DroidAugmentor executa uma série de passos até gerar um dataset
              sintético, juntamente com um conjunto de valores para métricas de
              desempenho e gráficos que permitem analisar a qualidade do
              dataset.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl max-sm:text-center">
            Fluxo de Execução
          </h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              A entrada é composta por parâmetros de execução e o conjunto de
              dados reais que serão utilizados no treinamento da cGAN. Esses
              parâmetros incluem configurações relacionadas ao cenário de
              avaliação, cGAN e treinamento. Em relação à cGAN, é possível
              configurar aspectos como número e densidade de camadas. Quanto ao
              treinamento da cGAN, é possível especificar itens como o número de
              épocas e o otimizador.
              <br />
              <br />O conjunto de dados reais pode ser visto como uma tabela na
              qual cada linha representa uma amostra. Uma coluna contém o rótulo
              da classe, onde cada amostra é rotulada como maligna ou benigna, e
              todas as outras colunas contêm características da amostra, como
              permissão de acesso à câmera.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <h4 className="font-bold text-base">
            Diagrama da arquitetura da CGAN de alto nível
          </h4>

          <img src={fluxoDroidAugmentor} alt="" className="w-11/12" />
          <p className="font-medium">GAN condicional</p>
        </div>
      </section>
    </PublicLayout>
  );
}

/*
   
            <div className="flex flex-col justify-center items-center mt-8">
              <h4 className="font-bold text-base">
                Diagrama da arquitetura da CGAN de alto nível
              </h4>

              <img src={FluxoDroidAugmentor} alt="" className="w-11/12" />
              <p className="font-medium">GAN condicional</p>
            </div>
*/
