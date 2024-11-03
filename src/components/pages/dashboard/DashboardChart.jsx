import useQueryData from "@/components/custom-hooks/useQueryData";
import React from "react";

import SpinnerWindow from "../partials/spinners/SpinnerWindow";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardChart = () => {
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

  console.log(result?.data);
  return (
    <>
      <h3>sadf</h3>

      {isLoading && !isFetching ? (
        <SpinnerWindow />
      ) : (
        <ResponsiveContainer width="100%" height="70%">
          <BarChart
            width={500}
            height={300}
            data={result?.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="transaction_datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="transaction_price"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default DashboardChart;
