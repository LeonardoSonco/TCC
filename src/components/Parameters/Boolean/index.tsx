import { Info } from "react-feather";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import style from "../index.module.css";
import { useState } from "react";
import Switch from "@mui/material/Switch";

interface BooleanTypeParametersProps {
  label: string;
  onChange: (active: boolean) => void;
  descritpion: string;
}

const BooleanTypeParameters: React.FC<BooleanTypeParametersProps> = ({
  label,
  onChange,
  descritpion,
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(true);
  };

  return (
    <>
      <div className={`flex items-center py-1 ${style.size} justify-between max-xs:flex-col`}>
        <div className="flex items-center">
          <Tooltip
            TransitionComponent={Zoom}
            title={descritpion}
            placement="top-start"
            arrow
          >
            <Info
              size={20}
              color="#FFFFFF"
              fill="#001A1A"
              className="font-bold"
              strokeWidth={2.5}
            />
          </Tooltip>

          <h4 className="mr-3 px-1 font-bold">{label}</h4>
        </div>
        <Switch
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
    </>
  );
};

export default BooleanTypeParameters;
