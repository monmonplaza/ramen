import { imgPath } from "@/components/helpers/functions-general.jsx";
import { Minus, Plus, X } from "lucide-react";
import React from "react";

const Cart = () => {
  return (
    <div className="w-[300px] h-screen fixed top-0 right-0 bg-white z-50 grid grid-rows-[auto,_1fr,_auto]">
      <div className="cart-header p-3 flex justify-between mb-2">
        <h4 className="mb-0">Your Cart</h4>
        <button>
          <X />
        </button>
      </div>

      <div className="cart-body px-2">
        <div className="card-item flex gap-2 items-center mb-2 pb-2 border-b border-gray-100">
          <img
            src={`${imgPath}/menu-1.webp`}
            alt=""
            className="w-[90px] h-[95px] object-cover"
          />

          <div className="basis-full">
            <h5 className="mb-0 text-[clamp(14px,_6vw,_18px)]">Michi</h5>
            <p>Shoyo Tonkotsu</p>
            <div className="flex justify-between items-center w-full">
              <ul className="flex gap-3 items-center">
                <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                  <button>
                    <Plus stroke="#fff" size={15} />
                  </button>
                </li>
                <li className="text-base font-bold">1</li>
                <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                  <button>
                    <Minus stroke="#fff" size={15} />
                  </button>
                </li>
              </ul>

              <h5 className="mb-0">
                <span className="text-xs pr-0.5 font-normal">PHP</span>100
              </h5>
            </div>
          </div>
        </div>

        <div className="card-item flex gap-2 items-center mb-2 pb-2 border-b border-gray-100">
          <img
            src={`${imgPath}/menu-1.webp`}
            alt=""
            className="w-[90px] h-[95px] object-cover"
          />

          <div className="basis-full">
            <h5 className="mb-0 text-[clamp(14px,_6vw,_18px)]">Michi</h5>
            <p>Shoyo Tonkotsu</p>
            <div className="flex justify-between items-center w-full">
              <ul className="flex gap-3 items-center">
                <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                  <button>
                    <Plus stroke="#fff" size={15} />
                  </button>
                </li>
                <li className="text-base font-bold">1</li>
                <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                  <button>
                    <Minus stroke="#fff" size={15} />
                  </button>
                </li>
              </ul>

              <h5 className="mb-0">
                <span className="text-xs pr-0.5 font-normal">PHP</span>100
              </h5>
            </div>
          </div>
        </div>

        <div className="card-item flex gap-2 items-center mb-2 pb-2 border-b border-gray-100">
          <img
            src={`${imgPath}/menu-1.webp`}
            alt=""
            className="w-[90px] h-[95px] object-cover"
          />

          <div className="basis-full">
            <h5 className="mb-0 text-[clamp(14px,_6vw,_18px)]">Michi</h5>
            <p>Shoyo Tonkotsu</p>
            <div className="flex justify-between items-center w-full">
              <ul className="flex gap-3 items-center">
                <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                  <button>
                    <Plus stroke="#fff" size={15} />
                  </button>
                </li>
                <li className="text-base font-bold">1</li>
                <li className="size-[25px] bg-accent grid place-content-center rounded-full ">
                  <button>
                    <Minus stroke="#fff" size={15} />
                  </button>
                </li>
              </ul>

              <h5 className="mb-0">
                <span className="text-xs pr-0.5 font-normal">PHP</span>100
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-summary  p-2 ">
        <h5 className="mb-3 pb-2 ">Summary</h5>
        <ul className="flex justify-between items-center mb-1">
          <li className="text-xs ">Subtotal</li>
          <li>
            <span>PHP</span>1000
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
            <span>PHP</span>1100.00
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
