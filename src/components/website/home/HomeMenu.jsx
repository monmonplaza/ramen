import { imgPath } from "@/components/helpers/functions-general.jsx";
import { Plus } from "lucide-react";
import React from "react";
import { ramens } from "./data-ramen.jsx";
import useQueryData from "@/components/custom-hooks/useQueryData.jsx";

const HomeMenu = ({ cartItem, setCartItem }) => {
  const {
    isLoading,
    isFetching,
    error,
    data: ramen,
  } = useQueryData(
    "/v1/ramen", // endpoint
    "get", // method
    "ramen" // key
  );

  const handleAddItem = (item) => {
    const exist = cartItem.find((cart) => cart.ramen_aid === item.ramen_aid);

    if (exist !== undefined) {
      setCartItem(
        cartItem.map((cart) =>
          cart.ramen_aid === item.ramen_aid
            ? { ...exist, quantity: exist.quantity + 1 }
            : cart
        )
      );
    } else {
      setCartItem([...cartItem, { ...item, quantity: 1 }]);
    }

    console.log("success add to cart");
  };

  return (
    <section className="py-24 bg-orange bg-[url('./public/img/pattern.webp')] bg-repeat bg-center bg-blend-color-burn bg-opacity-100">
      <div className="container">
        <h2 className="text-center uppercase text-white ">Ramen Menu</h2>
        <div className="grid grid-cols-2 gap-10 mt-14">
          {isLoading ? (
            <h4>loading...</h4>
          ) : (
            ramen?.data.map((item, key) => {
              return (
                <div className="grid-item mb-6" key={key}>
                  <div className="grid grid-cols-[250px_1fr] gap-2 items-center">
                    <div>
                      <h3 className="mb-5">{item.ramen_title}</h3>
                      <h4 className="text-accent">{item.ramen_price}</h4>
                      <h4 className="mb-5 text-nowrap">
                        {item.ramen_category}
                      </h4>

                      <ul className="text-white mb-5">
                        {JSON.parse(item.ramen_ingredients).map((item, key) => {
                          return (
                            <li className="" key={key}>
                              {item}
                            </li>
                          );
                        })}
                      </ul>

                      <button
                        className="btn btn-accent"
                        onClick={() => handleAddItem(item)}
                      >
                        <Plus size={18} /> Add to Cart
                      </button>
                    </div>
                    <img
                      src={`${imgPath}/${item.ramen_image}`}
                      alt=""
                      className="size-[300px] rounded-full object-cover"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
