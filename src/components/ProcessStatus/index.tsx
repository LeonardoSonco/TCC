import { Tooltip } from "@mui/material";
import { Check } from "react-feather";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";

const ProcessStatus = ({ name, processStatus }: any) => {
 

  return (
    <>
      <div className="shadow-shadowBox rounded-xl mb-6 cursor-pointer mx-10 hover:scale-101  transition-all">
        <Link to={processStatus.status === "SUCCEEDED" ? `/training/result/${name}/${processStatus.id}` : "/training"} > 
          <div className="flex justify-between items-center px-10 py-5 max-sm:flex-col max-sm: gap-2 text-center">
            <div>
              <h4 className="font-bold">Parâmetros:</h4>
              <Tooltip
                TransitionComponent={Zoom}
                title={JSON.stringify(processStatus.params)
                  .replace(/[{}"]/g, "")
                  .replace(/,/g, " | ")}
                placement="top-start"
                arrow
              >
                <span className="font-normal">{name}</span>
              </Tooltip>
            </div>
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
                  <p>{processStatus.status}</p>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProcessStatus;
