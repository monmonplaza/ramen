import useTableActions from "@/components/custom-hooks/useTableActions";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import {
  ActionArchive,
  ActionEdit,
  ActionRemove,
  ActionRestore,
} from "@/components/helpers/TableActions";
import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LayoutList, Search } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import NoData from "../partials/icons/NoData";
import ServerError from "../partials/icons/ServerError";
import LoaderTable from "../partials/LoaderTable";
import ModalConfirm from "../partials/modals/ModalConfirm";
import ModalDelete from "../partials/modals/ModalDelete";
import Pill from "../partials/Pill";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import TransactionModalInfo from "./TransactionModalInfo";

const TransactionTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [itemEdit, setItemEdit] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
  const [showInfo, setShowInfo] = React.useState(false);
  const [id, setId] = React.useState(null);

  const search = React.useRef({ value: "" });
  let counter = 1;

  const handleViewInfo = (item) => {
    setShowInfo(true);
    setId(item.transaction_aid);
  };

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["transaction", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/transaction/search`, // search endpoint
        `/v1/transaction/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          transaction_is_active: filterData,
          searchValue: search?.current?.value,
        }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="p-4 m-4">
        <div className="flex justify-between items-center">
          <form action="">
            <div className="input-wrap relative">
              <input
                type="text"
                placeholder="keyword"
                className="bg-primary px-2 py-1 placeholder:opacity-30 outline-none border border-transparent focus:border-accent !pl-8 rounded-md !text-dark"
              />
              <Search
                className="absolute top-2 left-1.5 opacity-25"
                size={20}
              />
            </div>
          </form>
        </div>

        <div className="table_wrapper bg-primary p-4 mt-5 rounded-md relative">
          {status !== "loading" && isFetching && <SpinnerTable />}

          <table>
            <thead>
              <tr>
                <td className="w-[20px]">#</td>
                <td>Date</td>
                <td>Subtotal</td>
                <td>Total</td>
                <td>Payment</td>
                <td>Change</td>

                <td></td>
              </tr>
            </thead>

            <tbody>
              {(status === "loading" || result?.pages[0].data.length === 0) && (
                <tr>
                  <td colSpan="100%">
                    {status === "loading" ? (
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

              {result?.pages.map((page, key) => (
                <React.Fragment key={key}>
                  {page.data.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>{counter++}. </td>
                        <td>{item.transaction_datetime} </td>
                        <td>{item.transaction_subprice} </td>
                        <td>{item.transaction_price} </td>
                        <td>{item.transaction_payment} </td>
                        <td>{item.transaction_change} </td>

                        <td>
                          <ul className="table-action">
                            <li>
                              <button
                                onClick={() => handleViewInfo(item)}
                                data-tooltip="list"
                              >
                                <LayoutList size={16} />
                              </button>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v1/transaction/${aid}`}
          queryKey="transaction"
          item="transaction"
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/v1/transaction/active/${aid}`}
          queryKey="transaction"
          item="transaction"
          active={isActive}
        />
      )}
      {showInfo && <TransactionModalInfo id={id} setShowInfo={setShowInfo} />}
    </>
  );
};

export default TransactionTable;
