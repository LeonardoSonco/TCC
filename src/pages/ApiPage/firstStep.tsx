import { useState } from "react";

import React from "react";
import { CheckCircle, Copy } from "react-feather";
import style from "./firstStep.module.css";

type CopiedStates = {
  [key: string]: boolean;
};

export default function ApiPage() {
  const [copiedStates, setCopiedStates] = useState<CopiedStates>({});

  const handleCopy = (textId: string) => {
    const textElement = document.getElementById(textId);
    if (textElement && textElement.textContent !== null) {
      let textToCopy = textElement.textContent;
      if (textToCopy === "git clone repo") {
        textToCopy =
          "git clone https://github.com/luizfelipelaviola/autodroid.git";
      }
      navigator.clipboard.writeText(textToCopy);
      setCopiedStates((prevState) => ({
        ...prevState,
        [textId]: true,
      }));
      setTimeout(() => {
        setCopiedStates((prevState) => ({
          ...prevState,
          [textId]: false,
        }));
      }, 1500);
    } else {
      console.error(
        `Elemento com o ID ${textId} não encontrado ou texto é null.`
      );
    }
  };
  return (
    <>
      <section className="mt-4">
        <div className="grid grid-cols-8 max-mobile:flex max-mobile:w-10/12 max-mobile:mx-auto">
          <nav className="col-span-2 flex justify-center max-mobile:hidden">
            <ul className="flex flex-col gap-6 ml-10">
              <li className="font-bold">Primeiros passos</li>
              <li>Parâmetros</li>
              <li>Documentação</li>
            </ul>
          </nav>

          <div className="col-span-5">
            <h3 className="font-bold text-xl ">Primeiros passos</h3>

            <div className="pl-4 flex flex-col gap-4">
              <p>
                Essas instruções fornecerão uma cópia do projeto instalado e
                funcionando em sua máquina local para fins de desenvolvimento e
                teste.
              </p>
              <p>
                Para começar, a máquina que irá executar esta aplicação deve ter
                os seguintes requisitos:
              </p>
              <ul className="list-disc pl-14 max-mobile:pl-4">
                <li>
                  Sistema operacional Linux (por exemplo, Ubuntu, Debian e
                  outros...) (MacOS/Windows é experimental)
                </li>
                <li>Virtualização habilitada no BIOS</li>
                <li>Mínimo de 4 GB de RAM</li>
                <li>
                  Mínimo de 10 GB de espaço livre em disco, dependendo dos
                  "processadores" disponíveis. (para arquivos, resultado de
                  processamento, banco de dados e imagens Docker)
                </li>
                <li>
                  <a href="https://git-scm.com/downloads">Git</a> instalado
                </li>
                <li>
                  <a href="https://docs.docker.com/get-docker/">Docker</a>{" "}
                  instalado
                </li>
              </ul>
            </div>

            <h3 className="font-bold text-xl py-4">Instalando</h3>
            <div className="pl-4 flex flex-col gap-4 ">
              <div>
                <p className="pb-3">
                  Usando seu terminal, clone este repositório em sua máquina
                  local usando Git:
                </p>

                <div
                  className={`shadow-shadowBox flex justify-between px-3 py-2 ml-2 rounded-lg ${style.size}`}
                >
                  <p id="clone-text">git clone repo</p>

                  {copiedStates["clone-text"] ? (
                    <div className="flex items-center">
                      <CheckCircle size={20} className="text-green-500 mr-2" />
                      <p className="text-green-500">Copiado!</p>
                    </div>
                  ) : (
                    <Copy size={20} onClick={() => handleCopy("clone-text")} />
                  )}
                </div>
              </div>

              <div>
                <p className="pb-3">Navegue até a pasta do repositório:</p>
                <div
                  className={`shadow-shadowBox flex justify-between px-3 py-2 ml-2 rounded-lg ${style.size}`}
                >
                  <p id="cd-text">cd autodroid</p>
                  {copiedStates["cd-text"] ? (
                    <div className="flex items-center">
                      <CheckCircle size={20} className="text-green-500 mr-2" />
                      <p className="text-green-500">Copiado!</p>
                    </div>
                  ) : (
                    <Copy size={20} onClick={() => handleCopy("cd-text")} />
                  )}
                </div>
              </div>

              <div>
                <p className="pb-3">Execute o script start.sh:</p>
                <div
                  className={`shadow-shadowBox flex justify-between px-3 py-2 ml-2 rounded-lg ${style.size}`}
                >
                  <p id="start-text">./start.sh</p>

                  {copiedStates["start-text"] ? (
                    <div className="flex items-center">
                      <CheckCircle size={20} className="text-green-500 mr-2" />
                      <p className="text-green-500">Copiado!</p>
                    </div>
                  ) : (
                    <Copy size={20} onClick={() => handleCopy("start-text")} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
