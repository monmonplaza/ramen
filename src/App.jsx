import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./components/website/home/Homepage.jsx";
import Ramen from "./components/pages/ramen/Ramen.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./components/store/StoreContext.jsx";
import Transaction from "./components/pages/transaction/Transaction.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/ramen" element={<Ramen />} />
            <Route path="/admin/transaction" element={<Transaction />} />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
