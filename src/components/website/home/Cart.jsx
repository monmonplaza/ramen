import { imgPath } from "@/components/helpers/functions-general.jsx";
import { Minus, Plus, X } from "lucide-react";
import React from "react";

const Cart = ({ cartItem, setCartItem, setIsShowCart }) => {
  const handleAddItem = (item) => {
    const exist = cartItem.find((cart) => cart.aid === item.aid);

    if (exist !== undefined) {
      setCartItem(
        cartItem.map((cart) =>
          cart.aid === item.aid
            ? { ...exist, quantity: exist.quantity + 1 }
            : cart
        )
      );
    } else {
      setCartItem([...cartItem, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (item) => {
    const exist = cartItem.find((cart) => cart.aid === item.aid);
    if (exist.quantity === 1) {
      setCartItem(cartItem.filter((cart) => cart.aid !== item.aid));
    } else {
      setCartItem(
        cartItem.map((cart) =>
          cart.aid === item.aid
            ? { ...exist, quantity: exist.quantity - 1 }
            : cart
        )
      );
    }
  };

  const getSubTotal = cartItem.reduce((a, c) => a + c.quantity * c.price, 0);

  return (
    <div className="w-[300px] h-screen fixed top-0 right-0 bg-white z-50 grid grid-rows-[auto,_1fr,_auto] shadow-[rgba(17,_0,_26,_0.1)_0px_0px_16px]">
      {/* <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-70"></div> */}
      <div className="cart-header p-3 flex justify-between mb-2">
        <h4 className="mb-0">Your Cart</h4>
        <button onClick={() => setIsShowCart(false)}>
          <X />
        </button>
      </div>

      <div className="cart-body px-2 h-full overflow-auto ">
        {cartItem.map((item, key) => {
          return (
            <div
              className="card-item flex gap-2 items-center mb-2 pb-2 border-b border-gray-100"
              key={key}
            >
              <img
                src={`${imgPath}/${item.img}`}
                alt=""
                className="w-[90px] h-[95px] object-cover"
              />

              <div className="basis-full">
                <h5 className="mb-0 text-[clamp(14px,_6vw,_18px)]">
                  {item.name}
                </h5>
                <p>{item.category}</p>
                <div className="flex justify-between items-center w-full">
                  <ul className="flex gap-3 items-center">
                    <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                      <button onClick={() => handleAddItem(item)}>
                        <Plus stroke="#fff" size={15} />
                      </button>
                    </li>
                    <li className="text-base font-bold">{item.quantity}</li>
                    <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                      <button onClick={() => handleRemoveItem(item)}>
                        <Minus stroke="#fff" size={15} />
                      </button>
                    </li>
                  </ul>

                  <h5 className="mb-0">
                    <span className="text-xs pr-0.5 font-normal">PHP</span>
                    {Number(item.quantity) * Number(item.price)}
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary mt-5 p-2 ">
        <h5 className="mb-3 pb-2 ">Summary</h5>
        <ul className="flex justify-between items-center mb-1">
          <li className="text-xs ">Subtotal</li>
          <li>
            <span>PHP</span>
            {getSubTotal}
          </li>
        </ul>
        <ul className="flex justify-between items-center mb-1">
          <li className="text-xs ">Service Fee</li>
          <li>
            <span>PHP</span>10.00
          </li>
        </ul>

        <ul className="flex justify-between items-center mb-1 mt-5 border-t border-gray-200 pt-2">
          <li className="text-base font-bold">Total </li>
          <li>
            <span>PHP</span>
            {getSubTotal + 10}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
