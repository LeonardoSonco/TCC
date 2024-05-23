//import StartedPage from "./pages/StartedPage";
import { Routes, Route } from "react-router-dom";

import ExecutionPage from "./pages/ExecutionPage";
import StartedPage from "./pages/StartedPage";
import AutoDroidDemo from "./AutoDroidDemo";
import CganPage from "./pages/CganPage";
import DroidAugmentorPage from "./pages/DroidAugmentorPage";
import AutoDroidPage from "./pages/AutoDroidPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartedPage />}></Route>
        <Route path="/about/cgans" element={<CganPage />}></Route>
        <Route path="/about/droidaugmentor" element={<DroidAugmentorPage />}></Route>
        <Route path="/about/autodroid" element={<AutoDroidPage />}></Route>
        <Route path="/training" element={<ExecutionPage />}></Route>
        <Route path="/demo" element={<AutoDroidDemo />}></Route>
      </Routes>
    </>
  );
}

export default App;
//<Route path="/papers" element={<PapersPage />}></Route>
