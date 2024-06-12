import { Route, Routes } from "react-router-dom";
import DroidAugmentorPage from "./DroidAugmentorPage";
import CganPage from "./CganPage";
import AutoDroidPage from "./AutoDroidPage";
import HomePage from "./HomePage";
import TrainingPage from "./TrainingPage";
import ResultPage from "./ResultPage";

const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about/cgans" element={<CganPage />}></Route>
        <Route
          path="/about/droidaugmentor"
          element={<DroidAugmentorPage />}
        ></Route>
        <Route path="/about/autodroid" element={<AutoDroidPage />}></Route>
        <Route path="/training" element={<TrainingPage />}></Route>
        <Route
          path="/training/result/:name/:id/"
          element={<ResultPage />}
        ></Route>
      </Routes>
    </>
  );
};

export default Root;
