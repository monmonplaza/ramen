import { StoreContext } from "@/components/store/StoreContext.jsx";
import React from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import Navigation from "../partials/Navigation";
import ToastSuccess from "../partials/ToastSuccess.jsx";
import RamenTable from "./RamenTable";

const Ramen = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <section className="flex  min-h-screen bg-secondary">
        <aside className="bg-primary text-dark basis-[200px] border-r border-gray-200">
          <Navigation menu="movies" />
        </aside>
        <main className="basis-[calc(100%-200px)] min-h-[100vh] grid grid-rows-[auto_1fr_auto]">
          <Header title="Ramen" subtitle="List of Movies" />
          <RamenTable />
          <Footer />
        </main>
      </section>
      {store.success && <ToastSuccess />}
    </>
  );
};

export default Ramen;
