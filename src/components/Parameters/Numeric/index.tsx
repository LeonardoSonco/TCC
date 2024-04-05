import { Info, Plus, Minus } from "react-feather";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import style from "../index.module.css";

interface NumericTypeParametersProps {
  label: string;
  onChange: (value: number) => void;
  descritpion: string;
}

const NumericTypeParameters: React.FC<NumericTypeParametersProps> = ({
  label,
  onChange,
  descritpion,
}) => {
  const [value, setValue] = useState<number>(0);

  const handleInputChange = (newValue: number) => {
    setValue(newValue);
    onChange(value);
  };

  const decreaseValue = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      onChange(value);
    }
  };

  const increaseValue = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange(value);
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
        <div className={`flex items-center border-2 border-gray rounded-md `}>
          <button onClick={decreaseValue} className="px-1">
            <Minus size={14} />
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => handleInputChange(parseInt(e.target.value))}
            className="border-none  w-14 h-6 text-center"
          />
          <button onClick={increaseValue} className={`px-1`}>
            <Plus size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NumericTypeParameters;
