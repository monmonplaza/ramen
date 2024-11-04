import { setSuccess } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { Check } from "lucide-react";
import React from "react";

const ToastSuccess = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(setSuccess(false));
    }, 1000);
  });

  return (
    <div>
      <div className="fixed top-16 right-5  bg-white rounded-md flex items-center gap-1 border border-success h-[30px]">
        <Check className="h-full w-[30px] bg-success text-white px-1.5" />
        <span className="text-sm px-2 ">Ramen added to cart</span>
      </div>
    </div>
  );
};

export default ToastSuccess;
