import { Check } from "react-feather";

const ProcessStatus = ({ name, processStatus }: any) => {
  return (
    <>
      <div className="shadow-shadowBox rounded-xl mb-6">
        <div className="flex justify-between items-center px-10 py-5 max-sm:flex-col max-sm: gap-2 text-center">
          <h4 className="font-bold">
            Parâmetros: <span className="font-normal">{name}</span>
          </h4>
          <p className="font-bold ">
            Nome do conjunto de dados usado:
            <span className="font-normal">
              {processStatus.dataset.description}
            </span>
          </p>
          <div className="flex items-center gap-1">
            <p className="font-bold">Status: </p>
            {processStatus.status === "SUCCEEDED" ? (
              <>
                <Check size={20}></Check>
              </>
            ) : (
              <>
                <p>FAIL</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessStatus;
