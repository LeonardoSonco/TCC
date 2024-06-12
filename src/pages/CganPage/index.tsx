import cganArq from "../../assets/img/cgan_arq.png";
import PublicLayout from "../../layouts/Public";

export default function CganPage() {
  return (
    <>
      <PublicLayout>
        <section className=" w-7/12 mx-auto mb-20 mt-10 max-lg:w-9/12 max-lg:max-sm:w-11/12 max-sm:text-justify">
          <div className="flex flex-col gap-4 ">
            <h3 className="font-bold text-xl max-sm:text-center">
              O que são GANs (Redes Adversárias Generativas) ?
            </h3>
            <div className="px-5 font-normal max-sm:px-1 ">
              <p className="pb-4">
                As GANs são compostas por dois componentes principais:
                um gerador e um discriminador.
              </p>

              <p>
                O gerador é uma rede neural que tem como objetivo criar novos
                dados que se assemelhem aos dados de treinamento. Por exemplo,
                se os dados de treinamento são imagens de rostos humanos, o
                gerador tentará criar novas imagens que pareçam rostos humanos.{" "}
                <br />
                <br />
                O discriminador é outra rede neural que recebe tanto os dados
                reais (do conjunto de treinamento) quanto os dados falsos
                (criados pelo gerador) e deve ser capaz de distinguir entre os
                dois.
              </p>
              <div className="flex flex-col justify-center items-center mt-8">
                <h4 className="font-bold text-base">
                  Diagrama da arquitetura da CGAN de alto nível
                </h4>

                <img src={cganArq} alt="" className="w-11/12 " />
                <p className="font-medium">GAN condicional</p>
              </div>
              <div className="my-8">
                <h4 className="bg-black text-white inline-block px-2 ">
                  O que é uma rede neural ?
                </h4>

                <p className="border-2 p-4 text-sm">
                  Uma rede neural é um método de inteligência artificial que
                  ensina computadores a processar dados de uma forma inspirada
                  pelo cérebro humano. É um tipo de processo de machine
                  learning, chamado aprendizado profundo, que usa nós ou
                  neurônios interconectados em uma estrutura em camadas,
                  semelhante ao cérebro humano. A rede neural cria um sistema
                  adaptativo que os computadores usam para aprender com os erros
                  e se aprimorar continuamente. As redes neurais artificiais
                  tentam solucionar problemas complicados, como resumir
                  documentos ou reconhecer rostos com grande precisão.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl max-sm:text-center">
              O que são CGANs (Redes Adversárias Generativas Condicionais) ?
            </h3>
            <div className="px-5 font-normal max-sm:px-1 ">
              <p>
                As CGANs são uma extensão das GANs que permitem a geração
                condicional de dados. Em uma CGAN, tanto o gerador quanto o
                discriminador recebem uma variável de condição adicional que
                guia o processo de geração de dados.
                <br />
                <br />
                Por exemplo, se você está treinando uma CGAN para gerar imagens
                de dígitos manuscritos, a variável de condição poderia ser o
                dígito específico que você deseja gerar. Então, em vez de gerar
                qualquer dígito aleatoriamente (como faria uma GAN), a CGAN
                geraria um dígito específico de acordo com a variável de
                condição. Esse controle sobre o tipo de dados gerados torna as
                CGANs uma ferramenta versátil na criação e aumento de dados.
              </p>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
}
