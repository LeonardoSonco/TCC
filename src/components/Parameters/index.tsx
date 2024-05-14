import { Info, Plus, Minus } from "react-feather";
import { useCallback, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import style from "../index.module.css";


const ParametersInput = () => {
    return <>
        <div
            className={`flex items-center py-1 ${style.size} justify-between max-xs:flex-col`}
        >
            <div className="flex items-center">
              
                <h4 className="mr-3 px-1 font-bold"></h4>
            </div>
            <div className={`flex items-center border-2 border-gray rounded-md `}>
                <button className="px-1">
                    <Minus size={14} />
                </button>
                <input
                    type="text"
                    inputMode="numeric"


                    className="border-none  w-14 h-6 text-center"
                />
                <button className={`px-1`}>
                    <Plus size={14} />
                </button>
            </div>
        </div>
    </>
}


export default ParametersInput;