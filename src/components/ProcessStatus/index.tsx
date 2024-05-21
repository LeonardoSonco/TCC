import { Check } from "react-feather";

const ProcessStatus = () => {
  return (
    <>
      <div className="shadow-shadowBox rounded-xl mb-6">
        <div className="flex justify-between items-center px-10 py-5 max-sm:flex-col max-sm: gap-2 text-center">
          <h4 className="font-bold">
            Parâmetros: <span className="font-normal">sf23_1l_64</span>
          </h4>
          <p className="font-bold ">
            Nome do conjunto de dados usado:
            <span className="font-normal">dataset_example.csv</span>
          </p>
          <div className="flex items-center gap-1">
            <p className="font-bold">Status: </p>
            <Check size={20}></Check>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessStatus;
