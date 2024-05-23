import { Play } from "react-feather";

import Logo from "../../assets/Logo2.svg";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HeaderExecutionEnvironment {
  isExecutionEnvironment?: boolean;
  menuActive?: string;
}

const Header: React.FC<HeaderExecutionEnvironment> = ({
  isExecutionEnvironment = false,
  menuActive = "",
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [menuHamburguer, setMenuHamburguer] = useState(false);

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
          <Link to={"/"} className="flex items-center text-xl font-semibold">
            <img src={Logo} alt="" className="w-14" />
            <h2>MalwareDatalab</h2>
          </Link>

          <nav>
            <section className="MOBILE-MENU flex lg:hidden">
              <div
                className="HAMBURGER-ICON space-y-2 cursor-pointer"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-0.5 w-8 bg-black"></span>
                <span className="block  h-0.5 w-8 bg-black"></span>
                <span className="block  h-0.5 w-8 bg-black"></span>
              </div>

              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                  className="CROSS-ICON absolute top-0 right-0 pl-8 pb-8 pr-3 pt-6 cursor-pointer"
                  onClick={() => {
                    setIsNavOpen(false);
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
                        <Link to={"/about/cgans"}>Entenda MalwareDatalab</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <Link
                        className="border-b border-gray py-3  uppercase cursor-pointer font-bold w-full px-2 "
                        to="/about/cgans"
                      >
                        CGANs
                      </Link>

                      <Link
                        className="border-b border-gray py-3  uppercase cursor-pointer font-bold w-full px-2 "
                        to="/about/droidaugmentor"
                      >
                        DroidAugmentor
                      </Link>

                      <Link
                        className="border-b border-gray py-3  uppercase cursor-pointer font-bold w-full px-2"
                        to="/about/autodroid"
                      >
                        AutoDroid
                      </Link>
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
                transition-duration: 500ms;
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
            <div className="flex items-center text-xl font-semibold">
              <img src={Logo} alt="" className="w-14" />
              <h2>MalwareDatalab</h2>
            </div>
          </Link>
          <nav>
            <ul className="flex items-center gap-10 font-medium">
              {isExecutionEnvironment ? (
                <> </>
              ) : (
                <>
                  {" "}
                  <Link
                    to="/about/cgans"
                    className={`${
                      menuActive == "cgans" ? "font-bold border-b-2" : ""
                    } `}
                  >
                    CGANs
                  </Link>
                  <Link
                    to="/about/droidaugmentor"
                    className={`${
                      menuActive == "droidaugmentor"
                        ? "font-bold border-b-2"
                        : ""
                    } `}
                  >
                    DroidAugmentor
                  </Link>
                  <Link
                    to="/about/autodroid"
                    className={`${
                      menuActive == "autodroid" ? "font-bold border-b-2" : ""
                    } `}
                  >
                    AutoDroid
                  </Link>
                </>
              )}
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
