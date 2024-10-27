import useTableActions from "@/components/custom-hooks/useTableActions";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import { setIsAdd } from "@/components/store/StoreAction";
import { StoreContext } from "@/components/store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Archive,
  ArchiveRestore,
  Pencil,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import NoData from "../partials/icons/NoData";
import ServerError from "../partials/icons/ServerError";
import LoaderTable from "../partials/LoaderTable";
import Pill from "../partials/Pill";
import SpinnerTable from "../partials/spinners/SpinnerTable";
import RamenModalAdd from "./RamenModalAdd";
import {
  ActionArchive,
  ActionEdit,
  ActionRemove,
  ActionRestore,
} from "@/components/helpers/TableActions";
import ModalDelete from "../partials/modals/ModalDelete";
import ModalConfirm from "../partials/modals/ModalConfirm";

const RamenTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [itemEdit, setItemEdit] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const [onSearch, setOnSearch] = React.useState(false);
  const [isFilter, setIsFilter] = React.useState(false);
  const [filterData, setFilterData] = React.useState("all");
  const search = React.useRef({ value: "" });
  let counter = 1;

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const {
    handleRemove,
    handleEdit,
    handleArchive,
    handleRestore,
    handleSuspend,
    aid,
    data,
    isActive,
  } = useTableActions({
    setItemEdit,
  });

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["ramen", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/ramen/search`, // search endpoint
        `/v1/ramen/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean, // search boolean
        {
          aid: "",
          isFilter,
          ramen_is_active: filterData,
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
          <button className="btn btn-accent" onClick={handleAdd}>
            <Plus size={14} /> Add New
          </button>
        </div>

        <div className="table_wrapper bg-primary p-4 mt-5 rounded-md relative">
          {status !== "loading" && isFetching && <SpinnerTable />}

          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Title</td>
                <td>Price</td>
                <td>Category</td>
                <td>Status</td>
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
                        <td>{item.ramen_title} </td>
                        <td>{item.ramen_price} </td>
                        <td>{item.ramen_category} </td>
                        <td>
                          <Pill isActive={item.ramen_is_active} />{" "}
                        </td>
                        <td>
                          <ul className="table-action">
                            {item.ramen_is_active === 1 ? (
                              <>
                                <ActionEdit
                                  handleClick={() =>
                                    handleEdit(item.ramen_aid, item)
                                  }
                                />

                                <ActionArchive
                                  handleClick={() =>
                                    handleArchive(item.ramen_aid, item)
                                  }
                                />
                              </>
                            ) : (
                              <>
                                <ActionRestore
                                  handleClick={() =>
                                    handleRestore(item.ramen_aid, item)
                                  }
                                />
                                <ActionRemove
                                  handleClick={() =>
                                    handleRemove(item.ramen_aid, item)
                                  }
                                />
                              </>
                            )}
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

      {store.isAdd && <RamenModalAdd itemEdit={itemEdit} />}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v1/ramen/${aid}`}
          queryKey="ramen"
          item={data.ramen_title}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/v1/ramen/active/${aid}`}
          queryKey="ramen"
          item={data.ramen_title}
          active={isActive}
        />
      )}
    </>
  );
};

export default RamenTable;
