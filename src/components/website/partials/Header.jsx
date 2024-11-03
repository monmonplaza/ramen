import { imgPath } from "@/components/helpers/functions-general.jsx";
import { ShoppingBag } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({ setIsShowCart, cartItem }) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`px-4 py-2 transition-all z-50 ${
          scrollPosition > 100 ? "fixed w-full bg-black top-0 left-0 " : ""
        }`}
      >
        <div className="flex justify-between items-center ">
          <div className="">
            <Link to="/">
              <img
                src={`${imgPath}/logo.png`}
                alt=""
                className={`${
                  scrollPosition > 100 ? "w-[40px]" : "w-[80px]"
                } transition-all`}
              />
            </Link>
          </div>

          <ul className="flex gap-10 items-center">
            <li>
              <NavLink to="/" className="text-base font-bold text-white">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="text-base font-bold text-white">
                Location
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="text-base font-bold text-white">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="text-base font-bold text-white">
                Blog
              </NavLink>
            </li>
          </ul>

          <button onClick={() => setIsShowCart(true)} className="relative">
            {cartItem.length > 0 && (
              <span className="absolute -top-2 -right-1 bg-alert text-white w-4 h-4 text-xs rounded-full pointer-events-none grid place-content-center text-[9px]">
                {cartItem.length}
              </span>
            )}

            <ShoppingBag stroke={"#fff"} />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
