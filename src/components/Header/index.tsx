import { Play } from "react-feather";
import Logo from "../../assets/Logo.png";

import { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface HeaderExecutionEnvironment {
  isExecutionEnvironment?: boolean;
}

const Header: React.FC<HeaderExecutionEnvironment> = ({
  isExecutionEnvironment = false,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [menuHamburguer, setMenuHamburguer] = useState(false);
  const [isAPISubmenuOpen, setIsAPISubmenuOpen] = useState(false);
  const [isPaperSubmenuOpen, setIsPaperSubmenuOpen] = useState(false);
  const [menuActive, setMenuActive] = useState("about");


 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 965) {
        setMenuHamburguer(true);
      } else {
        setMenuHamburguer(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavOpen) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNavOpen]);

  function handlerMenuActive(
    change: React.SetStateAction<string>
  ): MouseEventHandler<HTMLSpanElement> {
    return function (event) {
      setMenuActive(change);
    };
  }

  return (
    <>
      {menuHamburguer ? (
        <header
          className={`flex bg-gray_header justify-between items-center px-11 pt-5 pb-3 animate-fade animate-once animate-ease-in animate-delay-150
          ${isNavOpen ? "showMenu " : ""}
        `}
        >
          <img src={Logo} alt="" className="w-40" />

          <nav>
            <section className="MOBILE-MENU flex lg:hidden">
              <div
                className="HAMBURGER-ICON space-y-2"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-0.5 w-8 bg-black"></span>
                <span className="block  h-0.5 w-8 bg-black"></span>
                <span className="block  h-0.5 w-8 bg-black"></span>
              </div>

              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                  className="CROSS-ICON absolute top-0 right-0 pl-8 pb-8 pr-3 pt-6"
                  onClick={() => {
                    setIsNavOpen(false);
                    setIsPaperSubmenuOpen(false);
                    setIsAPISubmenuOpen(false);
                  }}
                >
                  <svg
                    className="h-8 w-8 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center min-h-[250px] ">
                  {isExecutionEnvironment ? (
                    <>
                      <li className="border-b border-gray py-3  uppercase cursor-pointer font-bold w-full px-2 ">
                        <Link to={"/about"}>Entenda Autodroid</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="border-b border-gray py-3  uppercase cursor-pointer font-bold w-full px-2 ">
                        Sobre
                      </li>
                      <li
                        className={`border-b border-gray py-3 uppercase cursor-pointer font-bold w-full px-2 ${
                          isAPISubmenuOpen
                            ? "bg-strong_gray text-white"
                            : "bg-white"
                        } `}
                        onClick={() => setIsAPISubmenuOpen(!isAPISubmenuOpen)}
                      >
                        <div
                          className={`flex justify-between items-center px-2 `}
                        >
                          {isAPISubmenuOpen ? (
                            <Play
                              style={{
                                transform: "rotate(90deg)",
                                fill: "white",
                              }}
                              size={13}
                            />
                          ) : (
                            <Play
                              style={{
                                transform: "rotate(180deg)",
                                fill: "black",
                              }}
                              size={13}
                            />
                          )}{" "}
                          <p>API</p>
                        </div>

                        {isAPISubmenuOpen && (
                          <ul className="submenu  text-sm font-medium text-left mt-2">
                            <li onClick={() => setIsNavOpen(false)}>
                              Primeiros passos
                            </li>
                            <li onClick={() => setIsNavOpen(false)}>
                              Parâmetros
                            </li>
                            <li onClick={() => setIsNavOpen(false)}>
                              Documentação
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className="border-b border-gray py-3  uppercase cursor-pointer font-bold w-full px-2">
                        Datasets
                      </li>
                      <li
                        className={`border-b border-gray py-3  uppercase cursor-pointer font-bold w-full px-2 ${
                          isPaperSubmenuOpen
                            ? "bg-strong_gray  text-white"
                            : "bg-white"
                        }`}
                        onClick={() =>
                          setIsPaperSubmenuOpen(!isPaperSubmenuOpen)
                        }
                      >
                        <div className="flex justify-between items-center px-2">
                          {isPaperSubmenuOpen ? (
                            <Play
                              style={{
                                transform: "rotate(90deg)",
                                fill: "white",
                              }}
                              size={13}
                            />
                          ) : (
                            <Play
                              style={{
                                transform: "rotate(180deg)",
                                fill: "black",
                              }}
                              size={13}
                            />
                          )}{" "}
                          <p>Papers</p>
                        </div>

                        {isPaperSubmenuOpen && (
                          <ul className="submenu text-sm font-medium text-left">
                            <li onClick={() => setIsNavOpen(false)}>
                              AutoDroid
                            </li>
                            <li onClick={() => setIsNavOpen(false)}>
                              DroidArgumentor
                            </li>
                          </ul>
                        )}
                      </li>
                    </>
                  )}
                </ul>
                <div className="overlay"></div>
                <style>{`
              .hideMenuNav {
                display: none;
                
              }
              .showMenuNav {
                display: block;
                position: absolute;
                width: 50%;
                height: 100vh;
                top: 0;
                right:0;
                background: #ffffff;
                z-index: 10;
                display: flex;
                flex-direction: column;
                //justify-content: start;
                padding-top: 70px;
                //align-items: center;
                text-align:end;
                transition: all;
                transition-duration: 5000ms;
              }
              .overlay {
                position: fixed;
                top: 0;
                left: 0%; /* metade da tela */
                width: 50%; /* metade da tela */
                height: 100%;
                background-color: rgba(124, 124, 124, 0.5); /* cor cinza com 50% de opacidade */
                z-index: 5;
              }
              
              .submenu {
                width: 100%;
                padding: 10px 0px 10px 10px;
               

              }
              
              .submenu li {
                list-style-type: none;
                padding: 5px 0;
                cursor: pointer;
                
              }
              
            `}</style>
              </div>
            </section>
          </nav>
        </header>
      ) : (
        <header className="flex justify-between px-16 py-4 items-center bg-gray_header">
          <Link to="/">
            {" "}
            <img src={Logo} alt="" className="w-40" />
          </Link>

          <ul className="flex items-center gap-10 font-medium">
            {isExecutionEnvironment ? (
              <> </>
            ) : (
              <>
                {" "}
                <Link
                  to="/about"
                  onClick={handlerMenuActive("about")}
                  className={`${
                    menuActive === "about" ? "font-bold border-b-2" : ""
                  } `}
                >
                  Sobre
                </Link>
                <Link
                  to="/api"
                  onClick={handlerMenuActive("api")}
                  className={`${
                    menuActive === "api" ? "font-bold border-b-2" : ""
                  } `}
                >
                  API
                </Link>
                <Link
                  to="/dataset"
                  onClick={handlerMenuActive("dataset")}
                  className={`${
                    menuActive === "dataset" ? "font-bold border-b-2" : ""
                  } `}
                >
                  Datasets
                </Link>
                <Link
                  to="/papers"
                  onClick={handlerMenuActive("papers")}
                  className={`${
                    menuActive === "papers" ? "font-bold border-b-2" : ""
                  } `}
                >
                  Papers
                </Link>
              </>
            )}
          </ul>

          <button className="bg-black_button py-2 w-44 rounded-sm text-white">
            Ambiente de execução
          </button>
        </header>
      )}
    </>
  );
};

export default Header;
