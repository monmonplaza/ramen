import React from "react";
import Navigation from "../partials/Navigation";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import DashboardTransaction from "./DashboardTransaction";
import DashboardRevenue from "./DashboardRevenue";
import DashboardOrder from "./DashboardOrder";
import DashboardRamen from "./DashboardRamen";
import DashboardChart from "./DashboardChart";
import MyComponent from "./MyComponent";

const Dashboard = () => {
  return (
    <section className="flex  min-h-screen bg-secondary">
      <aside className="bg-primary text-dark basis-[200px] border-r border-gray-200">
        <Navigation menu="dashboard" />
      </aside>
      <main className="basis-[calc(100%-200px)] min-h-[100vh] grid grid-rows-[auto_1fr_auto] ">
        <Header title="Dashboard" subtitle="" />
        <div className="p-4 m-4">
          <div className="grid grid-cols-[1fr_400px] gap-10">
            <main>
              <div className="grid grid-cols-3 gap-5 self-start">
                <DashboardTransaction />
                {/* <DashboardOrder /> */}
                <MyComponent />
                <DashboardRevenue />
              </div>
              <DashboardChart />
            </main>
            <aside>
              <DashboardRamen />
            </aside>
          </div>
        </div>
        <Footer />
      </main>
    </section>
  );
};

export default Dashboard;
