//import StartedPage from "./pages/StartedPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import PapersPage from "./pages/PapersPage";
import ApiPage from "./pages/ApiPage";
import DatasetPage from "./pages/DatasetPage";
import AboutPage from "./pages/AboutPage";
import ExecutionPage from "./pages/ExecutionPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/api" element={<ApiPage />}></Route>
        <Route path="/dataset" element={<DatasetPage />}></Route>
        <Route path="/papers" element={<PapersPage />}></Route>
        <Route path="/training" element={<ExecutionPage />}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
