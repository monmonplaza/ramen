import useQueryData from "@/components/custom-hooks/useQueryData";
import React from "react";
import Pill from "../partials/Pill";

const DashboardRamen = () => {
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v1/ramen`, // endpoint
    "get", // method
    "ramen" // key
  );

  return (
    <div className="p-4 bg-primary rounded-md">
      <h5 className="mb-5">Today's Ramen</h5>

      {!isLoading &&
        result?.data.map((item, key) => (
          <ul className="flex items-center justify-between mb-4" key={key}>
            <li>{item.ramen_title} </li>
            <li>
              {" "}
              <Pill isActive={item.ramen_is_active} />{" "}
            </li>
          </ul>
        ))}
    </div>
  );
};

export default DashboardRamen;
