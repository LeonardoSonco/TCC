import { Info } from "react-feather";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import style from "../index.module.css";


import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface StringTypeParametersProps {
  label: string;
  type:string;
  onChange: (option: string) => void;
  descritpion: string;
  options: string;
}

const StringTypeParameters: React.FC<StringTypeParametersProps> = ({
  label,
  type,
  onChange,
  descritpion,
  options,
}) => {
  const [chosenOption, setOption] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    onChange(chosenOption);
  };

  console.log();

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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">{type}</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={chosenOption}
            label="Opções"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {Object.entries(options).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default StringTypeParameters;
