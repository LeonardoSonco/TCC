import React, { MouseEventHandler, useState } from "react";
import FirstStep from "../../components/ApiPageComponents/FirstStep";
import Parameters from "../../components/ApiPageComponents/Parameters";
import Documentation from "../../components/ApiPageComponents/Documentation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ApiPage() {
  const [rendering, setRendering] = useState("firststep");

  function handlerChangeApiMenu(
    change: React.SetStateAction<string>
  ): MouseEventHandler<HTMLSpanElement> {
    return function (event) {
      setRendering(change);
    };
  }

  let contentRender;

  switch (rendering) {
    case "firststep":
      contentRender = <FirstStep />;
      break;

    case "parameters":
      contentRender = <Parameters />;
      break;

    case "documentation":
      contentRender = <Documentation />;
      break;
  }

  return (
    <>
    <Header />

    
      <section className="mt-4">
        <div className="grid grid-cols-8 max-mobile:flex max-mobile:w-10/12 max-mobile:mx-auto">
          <nav className="col-span-2 flex justify-center max-mobile:hidden">
            <ul className="flex flex-col gap-6 ml-10 ">
              <li
                className={`cursor-pointer  ${rendering === "firststep" ? "font-bold border-b-2 cursor-pointer" : ""}`}
                onClick={handlerChangeApiMenu("firststep")}
              >
                Primeiros passos
              </li>
              <li
                className={`cursor-pointer  ${rendering === "parameters" ? "font-bold border-b-2 cursor-pointer" : ""}`}
                onClick={handlerChangeApiMenu("parameters")}
              >
                Parâmetros
              </li>
              <li
                className={`cursor-pointer  ${rendering === "documentation" ? "font-bold border-b-2" : ""}`}
                onClick={handlerChangeApiMenu("documentation")}
              >
                Documentação
              </li>
            </ul>
          </nav>

          {contentRender}
        </div>
      </section>
      <Footer />
    </>
  );
}
