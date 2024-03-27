//import StartedPage from "./pages/StartedPage";

import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import ApiPage from "./pages/ApiPage/firstStep";
import PapersPage from "./pages/PapersPage";


function App() {
  return (
    <>
    <Header />
    <PapersPage />
    <Footer />
    </>
  );
}

export default App;
