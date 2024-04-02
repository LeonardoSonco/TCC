import { Info, Plus, Minus } from "react-feather";
import { useState } from "react";

interface ParameterComponentProps {
  label: string;
  onChange: (value: number) => void;
}

const ParametersComponent: React.FC<ParameterComponentProps> = ({
  label,
  onChange,
}) => {
  const [value, setValue] = useState<number>(0);

  const handleInputChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  const decreaseValue = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      onChange(newValue);
    }
  };

  const increaseValue = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <div className="flex items-center">
        <Info
          size={20}
          color="#FFFFFF"
          fill="black"
          className="font-bold"
          strokeWidth={2.5}
        />
        <h4 className="mr-3 px-1 font-bold">{label}</h4>
        <div className="flex items-center border-2 border-gray rounded-md">
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
          <button onClick={increaseValue} className="px-1">
            <Plus size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ParametersComponent;
