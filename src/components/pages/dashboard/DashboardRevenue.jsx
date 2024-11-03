import useQueryData from "@/components/custom-hooks/useQueryData";
import { ArrowLeftRight } from "lucide-react";
import React from "react";
import SpinnerButton from "../partials/spinners/SpinnerButton";

const DashboardRevenue = () => {
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

  const getRevenue =
    result?.data.length !== undefined &&
    result?.data.filter(
      (item) =>
        item.transaction_datetime.slice(0, 10) === date.toJSON().slice(0, 10)
    );

  return (
    <div className="p-4 bg-primary rounded-md">
      <div className="mb-5 size-[40px] text-dark grid place-content-center rounded-md">
        <ArrowLeftRight />
      </div>
      <h2>
        {isLoading ? (
          <SpinnerButton css={"stroke-black"} />
        ) : (
          Math.floor(
            getRevenue.reduce((a, c) => a + Number(c.transaction_price), 0)
          )
        )}
      </h2>
      <p>Today's Revenue</p>
    </div>
  );
};

export default DashboardRevenue;
