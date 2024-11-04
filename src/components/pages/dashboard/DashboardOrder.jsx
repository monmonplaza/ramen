import useQueryData from "@/components/custom-hooks/useQueryData";
import { ArrowLeftRight } from "lucide-react";
import React from "react";
import SpinnerButton from "../partials/spinners/SpinnerButton";

const DashboardOrder = () => {
  const [allItem, setAllItem] = React.useState([]);
  const date = new Date();

  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v1/transaction`, // endpoint
    "get", // method
    "transaction" // key
  );

  const getTransaction =
    result?.data.length !== undefined &&
    result?.data.filter(
      (item) =>
        item.transaction_datetime.slice(0, 10) === date.toJSON().slice(0, 10)
    );

  React.useEffect(() => {
    const getOrders =
      getTransaction.length > 0 &&
      getTransaction?.map((item) =>
        JSON.parse(item.transaction_cart_item).flat()
      );
    setAllItem(getOrders);
  }, []);

  return (
    <div className="p-4 bg-primary rounded-md">
      <div className="mb-5 size-[40px] text-dark grid place-content-center rounded-md">
        <ArrowLeftRight />
      </div>

      <h2>
        {isLoading ? (
          <SpinnerButton css={"stroke-black"} />
        ) : (
          console.log(allItem)
        )}
      </h2>
      <p>Today's Revenue</p>
    </div>
  );
};

export default DashboardOrder;
