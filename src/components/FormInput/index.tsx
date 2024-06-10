import { Info, Plus, Minus } from "react-feather";
import { useCallback, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import style from "./index.module.css";

interface NumericTypeParametersProps {
  label: string;
  onChange: (value: number) => void;
  value: string;
  description: string;
}

const FormInput: React.FC<NumericTypeParametersProps> = ({
  label,
  onChange,
  value,
}) => {
  const handleInputChange = (newValue: number) => {
    onChange(newValue);
  };

  const decreaseValue = useCallback(() => {

    if (parseInt(value) > 0) {
      const newValue = parseInt(value) - 1;
      onChange(newValue);
    }
  }, [value, onChange]);

  const increaseValue = useCallback(() => {
    const newValue = parseInt(value) + 1;
    onChange(newValue);
  }, [value, onChange]);

  return (
    <>
      <div className={`flex items-center py-1 justify-between max-xs+:flex-col`}>
        <div className="flex items-center">
          <h4 className="mr-3 px-1 font-bold">{label}</h4>
        </div>
        <div
          className={`flex items-center border-2 border-gray rounded-md w-32 justify-between `}
        >
          <button type="button" onClick={decreaseValue} className="px-1">
            <Minus size={14} />
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => handleInputChange(parseInt(e.target.value))}
            className="border-none w-14 h-6 text-center"
          />
          <button type="button" onClick={increaseValue} className={`px-1`}>
            <Plus  size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FormInput;
