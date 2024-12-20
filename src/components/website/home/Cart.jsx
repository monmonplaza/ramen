import { imgPath } from "@/components/helpers/functions-general.jsx";
import { Minus, Plus, ShoppingBasket, Trash2, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import { Form, Formik } from "formik";
import { InputText } from "@/components/helpers/FormInputs";

const Cart = ({ cartItem, setCartItem, setIsShowCart }) => {
  const [change, setChange] = React.useState(0);

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
  };

  const handleRemoveItem = (item) => {
    const exist = cartItem.find((cart) => cart.ramen_aid === item.ramen_aid);
    if (exist.quantity === 1) {
      setCartItem(cartItem.filter((cart) => cart.ramen_aid !== item.ramen_aid));
    } else {
      setCartItem(
        cartItem.map((cart) =>
          cart.ramen_aid === item.ramen_aid
            ? { ...exist, quantity: exist.quantity - 1 }
            : cart
        )
      );
    }
  };

  const getSubTotal = cartItem.reduce(
    (a, c) => a + c.quantity * c.ramen_price,
    0
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/transaction`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["transaction"],
      });

      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      } else {
        setIsShowCart(false);
        setCartItem([]);
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully updated.`));
      }
    },
  });

  const initVal = {
    transaction_aid: "",
    transaction_payment: "",
  };

  const yupSchema = Yup.object({
    transaction_payment: Yup.string().required("require"),
  });

  const handleComputeChange = (e) => {
    setChange(e.target.value - Number(getSubTotal) + Number(getSubTotal) * 0.1);
  };

  return (
    <div className="w-[300px] h-screen fixed top-0 right-0 bg-white text-black z-50 grid grid-rows-[auto,_1fr,_auto] shadow-[rgba(17,_0,_26,_0.1)_0px_0px_16px]">
      <div className="cart-header p-3 flex justify-between mb-2 border-b border-gray-200">
        <h5 className="mb-0  text-black leading-tight">Your Cart</h5>
        <button onClick={() => setIsShowCart(false)}>
          <X />
        </button>
      </div>

      <div className="cart-body px-2 h-full overflow-auto ">
        {cartItem.length > 0 ? (
          <button
            className="flex justify-end mb-5 w-full"
            onClick={() => setCartItem([])}
          >
            <Trash2 />
          </button>
        ) : (
          <div className="size-[200px] mx-auto text-center flex flex-col justify-center items-center opacity-30">
            <ShoppingBasket size={100} className="mb-5" strokeWidth={1.1} />
            <h4>Cart is Empty</h4>
          </div>
        )}

        {cartItem.map((item, key) => {
          return (
            <div
              className="card-item grid grid-cols-[90px_1fr] gap-2 items-center mb-2 pb-2 border-b border-gray-100"
              key={key}
            >
              <img
                src={`${imgPath}/${item.ramen_image}`}
                alt=""
                className="w-full h-[95px] object-cover "
              />

              <div className="basis-full">
                <h5 className="mb-0 text-[clamp(14px,_6vw,_18px)] text-black">
                  {item.ramen_title}
                </h5>
                <p>{item.ramen_category}</p>
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
                    {Number(item.quantity) * Number(item.ramen_price)}
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          mutation.mutate({
            ...values,
            transaction_cart_item: cartItem,
            transaction_subprice: getSubTotal,
            transaction_price: Number(getSubTotal) + Number(getSubTotal) * 0.1,
            transaction_change:
              values.transaction_payment -
              Number(getSubTotal) +
              Number(getSubTotal) * 0.1,
          });
        }}
      >
        {({ values }) => {
          return (
            <Form className="">
              <div className="cart-summary mt-5 p-2 ">
                <h5 className="mb-3 pb-2 ">Summary</h5>
                <ul className="flex justify-between items-center mb-1 text-xs space-y-2">
                  <li className=" ">Subtotal</li>
                  <li>
                    <span className="pr-1">PHP</span>
                    {Number(getSubTotal) > 0
                      ? Number(getSubTotal) + ".00"
                      : "0.00"}
                  </li>
                </ul>
                <ul className="flex justify-between items-center mb-1 text-xs space-y-2">
                  <li className=" ">Service Fee</li>
                  <li>
                    <span className="pr-1">PHP</span>
                    {Number(getSubTotal) > 0
                      ? Math.floor(Number(getSubTotal) * 0.08) + ".00"
                      : "0.00"}
                  </li>
                </ul>

                <ul className="flex justify-between items-center mb-1 text-xs space-y-2">
                  <li className="">Total </li>

                  <li>
                    <span className="pr-1">PHP</span>
                    {Number(getSubTotal) > 0
                      ? Number(getSubTotal) + Number(getSubTotal) * 0.1
                      : "0.00"}
                  </li>
                </ul>

                <div className="input-wrap mt-5 flex items-center justify-between [&>input]:basis-[70px] ">
                  <InputText
                    label="Payment"
                    type="text"
                    name="transaction_payment"
                    disabled={mutation.isPending}
                    onChange={(e) => handleComputeChange(e)}
                  />
                </div>

                <ul className="flex justify-between items-center  pt-2 mb-5 text-xs space-y-2">
                  <li className=" ">Change</li>
                  <li>
                    <span className="pr-1">PHP</span>
                    {Number(getSubTotal) > 0 ? change : "0.00"}
                  </li>
                </ul>

                <button
                  className="btn btn-accent w-full text-center flex justify-center"
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Cart;
