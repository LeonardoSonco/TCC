import Logo from "../../assets/Logo.png";

import { useEffect, useState } from "react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [menuHamburguer, setMenuHamburguer] = useState(false);
  const [isAPISubmenuOpen, setIsAPISubmenuOpen] = useState(false);

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
                  onClick={() => setIsNavOpen(false)}
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
                <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center min-h-[250px] text-black px-1">
                  <li className="border-b border-gray my-5 uppercase cursor-pointer font-bold w-full pr-2">
                    Sobre
                  </li>
                  <li
                    className="border-b border-gray my-5  uppercase cursor-pointer font-bold w-full pr-2 "
                    onClick={() => setIsAPISubmenuOpen(!isAPISubmenuOpen)}
                  >
                    <div className="flex justify-between px-2">
                      {isAPISubmenuOpen ? (
                        <span>{`^`}</span>
                      ) : (
                        <span>{`<`}</span>
                      )}{" "}
                      <p>API</p>
                    </div>

                    {isAPISubmenuOpen && (
                      <ul className="submenu text-sm font-medium">
                        <li onClick={() => setIsNavOpen(false)}>
                          Primeiros passos
                        </li>
                        <li onClick={() => setIsNavOpen(false)}>Parâmetros</li>
                        <li>Documentação</li>
                      </ul>
                    )}
                  </li>
                  <li className="border-b border-gray my-5 uppercase cursor-pointer font-bold w-full pr-2">
                    Datasets
                  </li>
                  <li className="border-b border-gray my-5 uppercase cursor-pointer font-bold w-full pr-2">
                    Papers
                  </li>
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
          <img src={Logo} alt="" className="w-40" />

          <ul className="flex items-center gap-10 font-medium">
            <li >Sobre</li>
            <li className="font-bold border-b-2">API</li>
            <li>Datasets</li>
            <li>Papers</li>
          </ul>

          <button className="bg-black_button py-2 w-44 rounded-sm text-white">
            Ambiente de execução
          </button>
        </header>
      )}
    </>
  );
}
