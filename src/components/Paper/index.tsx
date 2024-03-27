import { MouseEventHandler, useState } from "react";
import { Copy, FileText } from "react-feather";




interface ChildProps {
    bibtex: JSX.Element;
    resume: string;
    reference: string;
}

const AutoDroidPaper: React.FC<ChildProps> = ({bibtex,resume,reference}) => {
  const [type, setType] = useState("bibtex");

  function handleChangePaper(
    change: string
  ): MouseEventHandler<HTMLSpanElement> {
    return function (event) {
      setType(change);

     
    };
  }

  return (
    <>
      <div className=" max-w-2xl">
        <h3 className="font-bold mb-10 text-center">
          Artigos de pesquisa referentes ao AutoDroid{" "}
        </h3>

        <p className="mb-2">
          {reference}
        </p>

        <div className="flex items-center justify-between">
          <div className="border-t-2 border-gray mt-2 w-full ">
            <div>
              {type === "bibtex" ? (
                <>
                  <span
                    onClick={handleChangePaper("bibtex")}
                    className="cursor-pointer border-t-2 border-black  px-2 font-bold"
                  >
                    Bibtex
                  </span>
                  <span
                    onClick={handleChangePaper("resumo")}
                    className="cursor-pointer px-2"
                  >
                    Resumo
                  </span>
                </>
              ) : (
                <>
                  <span
                    onClick={handleChangePaper("bibtex")}
                    className="cursor-pointer  px-2"
                  >
                    Bibtex
                  </span>
                  <span
                    onClick={handleChangePaper("resumo")}
                    className="cursor-pointer border-t-2 border-black px-2 font-bold"
                  >
                    Resumo
                  </span>
                </>
              )}
            </div>
          </div>
          <FileText className="ml-4" />
        </div>

        {type === "bibtex" ? (
          <>
            <div className="bg-light_gray p-2 mt-4">
              <p className="ml-4">{bibtex}</p>

              <div className="flex justify-end w-11/12 pb-4">
                <Copy className="text-end" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-2 mt-4">
              <p className="text-justify">
                {resume}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AutoDroidPaper;
