import cganArq from "../../assets/img/autodroid_arq.png";
import PublicLayout from "../../layouts/Public";

const AutoDroidPage: React.FC = () => {
  return (
    <PublicLayout>
      <section className=" w-7/12 flex flex-col gap-4 mx-auto mb-20 mt-10 max-lg:w-9/12 max-lg:max-sm:w-11/12 max-sm:text-justify">
        <div className="flex flex-col gap-4 ">
          <h3 className="font-bold text-xl max-sm:text-center">
            O que é o AutoDroid ?
          </h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              O AutoDroid é uma virtualização leve que disponibiliza como
              serviço a ferramenta DroidAugmentor. Para enfrentar a emergência
              de malware gerados por IA de maneira escalável, e imperativo
              compreender e adotar contramedidas baseadas em IA, como modelos
              preditivos.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl max-sm:text-center">
            Como funciona o AutoDroid ?{" "}
          </h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              AutoDroid é um aplicativo que permite aos usuários executar um
              determinado aplicativo externo por meio de uma API REST.
              <br /> <br />
              Este software fornece uma lista pré-configurada de aplicações,
              aqui denominada “processador”, consistindo em uma imagem Docker
              com sua configuração padrão de entrada e saída e possíveis
              parâmetros.
              <br /> <br />
              Atuando como gerenciador/orquestrador das execuções utilizando
              contêineres Docker, é possível executar múltiplas aplicações
              utilizando este software ao mesmo tempo, e até mesmo gerenciar seu
              ciclo de vida.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <h4 className="font-bold text-base">
              Diagrama da arquitetura da CGAN de alto nível
            </h4>

            <img src={cganArq} alt="" className="w-11/12" />
            <p className="font-medium">GAN condicional</p>
          </div>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              A arquitetura do AutoDroid basicamente constitui a partir de três
              componentes principais: o User, a API Gateway e o Data Processor.
              <br /> <br />
              O User representa o agente responsável por fornecer o conjunto de
              dados que irá ser processado.
              <br /> <br />A API Gateway desempenha um papel central no
              ecossistema do AutoDroid, onde consiste em uma API REST que roteia
              os dados a serem processados pelo Data Processor. Além disso,
              mantém registros em dois bancos de dados distintos, um deles
              relacional e o outro em memória.
              <br /> <br />O Data Processor é uma abstração que atua como uma
              camada de virtualização leve do gerador de dados sintéticos
              DroidAugmentor. Isso é feito com o intuito de aprimorar a
              escalabilidade, elasticidade e a capacidade de lidar com falhas do
              sistema.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl max-sm:text-center">
            Porque usar o AutoDroid ?
          </h3>
          <div className="px-5 font-normal max-sm:px-1 ">
            <p>
              Executar aplicações, para diversas finalidades como processamento
              de dados ou mesmo teste, pode ser uma tarefa muito demorada,
              considerando a necessidade de instalar todas as suas dependências,
              configurá-las e executá-las.
              <br />
              <br />
              Encapsular aplicativos em contêineres Docker pode ser uma solução
              para esse problema, mas ainda é um processo muito manual e não
              muito fácil de gerenciar.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AutoDroidPage;
