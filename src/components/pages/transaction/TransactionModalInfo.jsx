import React from "react";
import ModalWrapper from "../partials/modals/ModalWrapper";
import { X } from "lucide-react";
import useQueryData from "@/components/custom-hooks/useQueryData";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import ServerError from "../partials/icons/ServerError";
import LoaderTable from "../partials/LoaderTable";
import NoData from "../partials/icons/NoData";

const TransactionModalInfo = ({ id, setShowInfo }) => {
  let counter = 0;
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/v1/transaction/${id}`, // endpoint
    "get", // method
    "transaction" // key
  );

  return (
    <ModalWrapper>
      <div className="modal-main bg-primary z-50 max-w-[650px] w-full rounded-md">
        <div className="modal-header p-2 border-b border-line flex justify-between items-center">
          <h6 className="mb-0 leading-none text-warning">Transaction Info</h6>
          <button onClick={() => setShowInfo(false)}>
            <X />
          </button>
        </div>
        <div className="modal-body p-2 px-4 text-center">
          <div className="table-wrapper">
            {isLoading && !isFetching && SpinnerTable}
            <table>
              <thead>
                <tr className="[*] > th: text-left">
                  <th className="w-[20px]">#</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {((isLoading && !isFetching) || result?.data.length === 0) && (
                  <tr>
                    <td colSpan="100%">
                      {isLoading ? (
                        <LoaderTable count={30} cols={6} />
                      ) : (
                        <NoData />
                      )}
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="100%" className="p-10">
                      <ServerError />
                    </td>
                  </tr>
                )}

                {result?.data[0].transaction_cart_item !== undefined &&
                  JSON.parse(result?.data[0].transaction_cart_item).map(
                    (item, key) => {
                      counter++;
                      return (
                        <tr className="[*] > th: text-left" key={key}>
                          <td className="w-[30px]">{counter}.</td>
                          <td>{item.ramen_title}</td>
                          <td>{item.ramen_price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            {Number(item.ramen_price) * Number(item.quantity)}
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="modal-footer flex py-2 px-4 border-t border-line justify-between gap-3">
          <h6>
            Total:{" "}
            {!isLoading &&
              JSON.parse(result?.data[0].transaction_cart_item).reduce(
                (a, c) => a + c.quantity * c.ramen_price,
                0
              )}
          </h6>

          <button
            className="btn btn-cancel !text-xs"
            type="reset"
            onClick={() => setShowInfo(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TransactionModalInfo;
