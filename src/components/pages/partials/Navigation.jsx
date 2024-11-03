import React from "react";
import { Link } from "react-router-dom";
import {
  Clapperboard,
  LayoutDashboard,
  ReceiptText,
  Soup,
  Star,
} from "lucide-react";
import { imgPath } from "@/components/helpers/functions-general";

const Navigation = ({ menu }) => {
  return (
    <div className="p-4 ">
      <div className="mb-5">
        <img src={`${imgPath}/logo.png`} alt="" className="w-[30%]" />
      </div>

      <nav>
        <ul className="space-y-5">
          <li>
            <Link
              to="/admin/dashboard"
              className={`${menu === "dashboard" ? "active" : ""} nav-link`}
            >
              {" "}
              <LayoutDashboard size={18} strokeWidth={1} /> Dashboard{" "}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/ramen"
              className={`${menu === "movies" ? "active" : ""} nav-link`}
            >
              {" "}
              <Soup size={18} strokeWidth={1} /> Ramen{" "}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/transaction"
              className={`${menu === "transaction" ? "active" : ""} nav-link`}
            >
              {" "}
              <ReceiptText size={18} strokeWidth={1} /> Transaction{" "}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
