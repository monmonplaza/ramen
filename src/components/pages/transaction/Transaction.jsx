import React from "react";
import Navigation from "../partials/Navigation";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import TransactionTable from "./TransactionTable";

const Transaction = () => {
  return (
    <section className="flex  min-h-screen bg-secondary">
      <aside className="bg-primary text-dark basis-[200px] border-r border-gray-200">
        <Navigation menu="transaction" />
      </aside>
      <main className="basis-[calc(100%-200px)] min-h-[100vh] grid grid-rows-[auto_1fr_auto]">
        <Header title="Transaction" subtitle="" />
        <TransactionTable />
        <Footer />
      </main>
    </section>
  );
};

export default Transaction;
