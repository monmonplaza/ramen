import { imgPath } from "@/components/helpers/functions-general.jsx";
import { Plus } from "lucide-react";
import React from "react";
import { ramens } from "./data-ramen.jsx";

const HomeMenu = () => {
  return (
    <section className="py-24 bg-orange bg-[url('./public/img/pattern.webp')] bg-repeat bg-center bg-blend-color-burn bg-opacity-100">
      <div className="container">
        <h2 className="text-center uppercase ">Ramen Menu</h2>
        <div className="grid grid-cols-2 gap-10 mt-14">
          {ramens.map((ramen, key) => {
            return (
              <div className="grid-item mb-6" key={key}>
                <div className="grid grid-cols-[250px_1fr] gap-2 items-center">
                  <div>
                    <h3 className="mb-5">{ramen.name}</h3>
                    <h4 className="text-accent">{ramen.price}</h4>
                    <h4 className="mb-5 text-nowrap">{ramen.category}</h4>

                    <ul className="text-light mb-5">
                      {ramen.ingridents.map((item, key) => {
                        return (
                          <li className="text-light" key={key}>
                            {item}
                          </li>
                        );
                      })}
                    </ul>

                    <button className="btn btn-accent">
                      <Plus size={18} /> Add to Cart
                    </button>
                  </div>
                  <img
                    src={`${imgPath}/${ramen.img}`}
                    alt=""
                    className="size-[300px] rounded-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
