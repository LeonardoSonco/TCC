import logo from "../../assets/Logo.png";
import github from "../../assets/GitHub.svg";

import style from "./index.module.css";
import { Link } from "react-router-dom";

export default function StartedPage() {
  return (
    <>
      <section className="bg-gray h-screen w-full flex justify-center items-center">
        <div
          className={`bg-white flex flex-col items-center gap-8 py-16 rounded-2xl ${style.size} shadow-shadowBox`}
        >
          <img src={logo} alt="" className="w-48" />

          <div className="text-white text-sm flex gap-5 max-sm:flex-col">
            <button className="bg-black_button rounded-3xl py-2 w-48">
              <Link to="/about">Entenda o Autodroid</Link>
            </button>
            <button className="bg-black_button rounded-3xl py-2 w-48">
              <Link to="/training">Ambiente de execução</Link>
            </button>
          </div>

          <a href="https://github.com/luizfelipelaviola/autodroid">
            <img src={github} alt="" className="w-10" />
          </a>
        </div>
      </section>
    </>
  );
}
