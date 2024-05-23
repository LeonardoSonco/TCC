import Logo from "../../assets/Logo2.svg";
import github from "../../assets/GitHub.svg";

import style from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/services";

export default function StartedPage() {
  const navigate = useNavigate();

  const handlerRegisterUser = async () => {
    await registerUser();
    navigate("/training");
  };

  return (
    <>
      <section className="bg-gray h-screen w-full flex justify-center items-center">
        <div
          className={`bg-white flex flex-col items-center gap-8 py-16 rounded-2xl ${style.size} shadow-shadowBox`}
        >
          <div className="flex items-center text-2xl font-semibold">
            <img src={Logo} alt="" className="w-20" />
            <h2>MalwareDatalab</h2>
          </div>

          <div className="text-white text-sm flex gap-5 max-sm:flex-col">
            <button className="bg-black_button rounded-3xl py-2 w-48">
              <Link to="/about/cgans">Entenda o MalwareDatalab</Link>
            </button>
            <button
              className="bg-black_button rounded-3xl py-2 w-48"
              onClick={handlerRegisterUser}
            >
              Ambiente de execução
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
