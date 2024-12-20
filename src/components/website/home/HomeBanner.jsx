import { imgPath } from "@/components/helpers/functions-general.jsx";
import { Dot, ShoppingBag } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Header from "../partials/Header.jsx";

const HomeBanner = ({ setIsShowCart, cartItem }) => {
  return (
    <section className="bg-[url('./public/img/banner.webp')] bg-cover bg-no-repeat bg-[left_top_-400px] min-h-[80vh] relative ">
      <div className="container">
        <Header setIsShowCart={setIsShowCart} cartItem={cartItem} />
        <div className="absolute top-[14vw] left-1/2 -translate-x-1/2 text-center uppercase">
          <h1 className="text-white mb-1 text-[clamp(50px,_6vw,_180px)]">
            Michi Ramen
          </h1>
          <p className="text-white flex justify-center font-bold text-[clamp(18px,_6vw,_20px)]">
            Tues - Sunday 11AM-Midnight <Dot /> Happy Hours 9pm-11pm
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
