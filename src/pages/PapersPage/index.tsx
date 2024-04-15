import { MouseEventHandler, useState } from "react";
import AutoDroidPaper from "../../components/Paper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const AutoDroidInfo = {
  bibtex: (
    <>
      @inproceedings{"{"}
      <br />
      &nbsp;&nbsp;author = {"{"}Luiz Laviola and Kayuã Paim and Diego Kreutz and
      Rodrigo Mansilha{"}"},
      <br />
      &nbsp;&nbsp;title = {"{"}AutoDroid: disponibilizando a ferramenta
      DroidAugmentor como serviço{"}"},
      <br />
      &nbsp;&nbsp;booktitle = {"{"}Anais da XX Escola Regional de Redes de
      Computadores{"}"},
      <br />
      &nbsp;&nbsp;location = {"{"}Porto Alegre/RS{"}"},
      <br />
      &nbsp;&nbsp;year = {"{"}2023{"}"},
      <br />
      &nbsp;&nbsp;keywords = {"{}"},
      <br />
      &nbsp;&nbsp;issn = {"{"}0000-0000{"}"},
      <br />
      &nbsp;&nbsp;pages = {"{"}145--150{"}"},
      <br />
      &nbsp;&nbsp;publisher = {"{"}SBC{"}"},
      <br />
      &nbsp;&nbsp;address = {"{"}Porto Alegre, RS, Brasil{"}"},
      <br />
      &nbsp;&nbsp;doi = {"{"}10.5753/errc.2023.929{"}"},
      <br />
      &nbsp;&nbsp;url = {"{"}
      https://sol.sbc.org.br/index.php/errc/article/view/26020{"}"}
      <br />
      {"}"}
    </>
  ),
  resume:
    "Propomos a AutoDroid, uma solução baseada em virtualização leve para disponibilizar como serviço a ferramenta DroidAugmentor, cujo objetivo é permitir o aumento de datasets utilizados para combater malwares Android através de IA. Disponibilizamos publicamente uma implementação da AutoDroid como prova de conceito. Apresentamos também uma avaliaçãoo qualitativa preliminar e esperamos que a solução viabilize a execução distribuída de outros serviços de AutoML, como a DroidAutoML.",
  reference:
    "LAVIOLA, L. et al. Autodroid: disponibilizando a ferramenta droidaugmentor como serviço. In: Anais da XX Escola Regional de Redes de Computadores. Porto Alegre, RS, Brasil: SBC, 2023. p. 145–150.",
};

const DroidArgumentorInfo = {
  bibtex: (
    <>
      @inproceedings{"{"}
      <br />
      &nbsp;&nbsp;author = {"{"}Karina Casola and Kayuã Paim and Rodrigo
      Mansilha and Diego Kreutz{"}"},
      <br />
      &nbsp;&nbsp;title = {"{"}DroidAugmentor: uma ferramenta de treinamento e
      avaliação de cGANs para geração de dados sintéticos{"}"},
      <br />
      &nbsp;&nbsp;booktitle = {"{"}Anais Estendidos do XXIII Simpósio Brasileiro
      de Segurança da Informação e de Sistemas Computacionais{"}"},
      <br />
      &nbsp;&nbsp;location = {"{"}Juiz de Fora/MG{"}"},
      <br />
      &nbsp;&nbsp;year = {"{"}2023{"}"},
      <br />
      &nbsp;&nbsp;keywords = {"{}"},
      <br />
      &nbsp;&nbsp;issn = {"{"}0000-0000{"}"},
      <br />
      &nbsp;&nbsp;pages = {"{"}57--64{"}"},
      <br />
      &nbsp;&nbsp;publisher = {"{"}SBC{"}"},
      <br />
      &nbsp;&nbsp;address = {"{"}Porto Alegre, RS, Brasil{"}"},
      <br />
      &nbsp;&nbsp;doi = {"{"}10.5753/sbseg_estendido.2023.235793{"}"},
      <br />
      &nbsp;&nbsp;url = {"{"}
      https://sol.sbc.org.br/index.php/sbseg_estendido/article/view/27273{"}"}
      <br />
      {"}"}
    </>
  ),
  resume:
    "A DroidAugmentor utiliza cGANs para criar dados sintéticos rotulados como benignos ou malignos. A ferramenta incorpora métricas de similaridade e aplicabilidade para avaliar a qualidade desses dados. Demonstramos a eficácia da DroidAugmentor na geração de 12.126 amostras sintéticas para o dataset Drebin-215, indicando a capacidade de capturar padrões representativos para o aumento de dados.",
  reference:
    "CASOLA, K. et al. Droidaugmentor: uma ferramenta de treinamento e avaliação de cgans para geração de dados sintéticos. SBC, 2023.",
};

export default function PapersPage() {
  const [paper, setPaper] = useState("AutoDroid");

  function handleChangePaper(
    change: string
  ): MouseEventHandler<HTMLSpanElement> {
    return function (event) {
      setPaper(change);
    };
  }

  return (<>
  <Header />
    <section className="mt-4">
      <div className="grid grid-cols-8 max-mobile:flex max-mobile:w-10/12 max-mobile:mx-auto">
        

        {paper === "AutoDroid" ? (
          <>
            <nav className="col-span-2 flex justify-center max-mobile:hidden">
              <ul className="flex flex-col gap-6 ml-10">
                <li className="font-bold cursor-pointer border-b-2">AutoDroid</li>
                <li onClick={handleChangePaper("DroidArgumentor")} className="cursor-pointer">DroidArgumentor</li>
              </ul>
            </nav>
            <div className="col-span-5">
              <AutoDroidPaper {...AutoDroidInfo} />
            </div>
          </>
        ) : (
          <>
            <nav className="col-span-2 flex justify-center max-mobile:hidden">
              <ul className="flex flex-col gap-6 ml-10">
                <li onClick={handleChangePaper("AutoDroid")} className="cursor-pointer">AutoDroid</li>
                <li className="font-bold cursor-pointer border-b-2">DroidArgumentor</li>
              </ul>
            </nav>
            <div className="col-span-5">
              <AutoDroidPaper {...DroidArgumentorInfo} />
            </div>
          </>
        )}
      </div>
    </section>
    <Footer />
    </>
  );
}
