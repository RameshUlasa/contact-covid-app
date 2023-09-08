import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ChartsAndMaps from "./components/ChartsAndMapsPage";
import ContactPage from "./components/ContactPage";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ContactPage />} />
        <Route path="/chartsAndMaps" element={<ChartsAndMaps />} />
      </Routes>
    </>
  );
};

export default App;
