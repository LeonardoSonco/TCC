import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/css/header.css";
import Logo from "../../assets/img/logoFaviconDark.svg";
import { ArrowLeft, ArrowLeftCircle } from "react-feather";

interface HeaderExecutionEnvironment {
  isExecutionEnvironment?: boolean;
}

const Header: React.FC<HeaderExecutionEnvironment> = ({
  isExecutionEnvironment = false,
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
                <>

                  
                </>
              ) : (
                <>
                  <Link to="/about/cgans" className={`hover:border-b-2 `}>
                    CGANs
                  </Link>
                  <Link
                    to="/about/droidaugmentor"
                    className={`hover:border-b-2 `}
                  >
                    DroidAugmentor
                  </Link>
                  <Link to="/about/autodroid" className={`hover:border-b-2`}>
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
