import { imgPath } from "@/components/helpers/functions-general.jsx";
import { ShoppingBag } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({ setIsShowCart }) => {
  return (
    <div>
      <header className="py-3">
        <div className="flex justify-between items-center">
          <div className="">
            <Link to="/">
              <img src={`${imgPath}/logo.png`} alt="" className="w-[80px]" />
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

          <button onClick={() => setIsShowCart(true)}>
            <ShoppingBag stroke={"#fff"} />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
