import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
    <Header />
      <section className=" w-7/12 mx-auto mb-20  max-lg:w-9/12 max-lg:max-sm:w-11/12 max-sm:text-justify">
        <div className="flex flex-col gap-4 ">
          <h3 className="font-bold text-xl max-sm:text-center">The AutoDroid</h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p className="pb-4">
              Para enfrentar a emergência de malwares gerados por IA de maneira
              escalável, e imperativo compreender e adotar contramedidas
              baseadas em IA, como modelos preditivos. Porem, o sucesso dessas
              estrategias dependem significativamente da qualidade e quantidade
              dos conjuntos de dados de treinamento.
            </p>

            <p>
              Para isso, o AutoDroid propoem uma virtualização leve para
              disponibilizar como servi¸co a ferramenta DroidAugmentor.
            </p>

            <div className="my-8">
              <h4 className="bg-black text-white inline-block px-2 ">
                O que faz a ferramenta DroidArgumentos ?
              </h4>

              <p className="border-2 p-4 text-sm">
                O DroidAugmentor é uma ferramenta que emprega Generative
                Adversarial Networks (cGANs) para gerar dados sintéticos
                rotulados por classe. Essa ferramenta inclui métricas para
                avaliar a similaridade e a aplicabilidade dos dados sintéticos
                gerados. Sua eficácia é destacada ao usar o conjunto de dados
                Drebin-215, gerando 12.126 amostras sintéticas que abrangem 100%
                das amostras do conjunto de dados.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl max-sm:text-center">Motivação</h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              Executar aplicações, para diversas finalidades como processamento
              de dados ou mesmo teste, pode ser uma tarefa muito demorada,
              considerando a necessidade de instalar todas as suas dependências,
              configurá-las e executá-las.
            </p>
            <p className="py-4">
              Encapsular aplicativos em contêineres Docker pode ser uma solução
              para esse problema, mas ainda é um processo muito manual e não
              muito fácil de gerenciar.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl max-sm:text-center">Solução</h3>
          <div className="px-5 font-normal flex flex-col gap-4 max-sm:px-1 ">
            <p>
              AutoDroid é um aplicativo que permite aos usuários executar um
              determinado aplicativo externo por meio de uma API REST.
            </p>
            <p>
              Este software fornece uma lista pré-configurada de aplicações,
              aqui denominada “processador”, consistindo em uma imagem Docker
              com sua configuração padrão de entrada e saída e possíveis
              parâmetros.
            </p>
            <p>
              Atuando como gerenciador/orquestrador das execuções utilizando
              contêineres Docker, é possível executar múltiplas aplicações
              utilizando este software ao mesmo tempo, e até mesmo gerenciar seu
              ciclo de vida.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
