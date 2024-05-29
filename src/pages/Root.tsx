import { Route, Routes } from "react-router-dom";
import DroidAugmentorPage from "./DroidAugmentorPage";
import CganPage from "./CganPage";
import AutoDroidPage from "./AutoDroidPage";
import HomePage from "./HomePage";
import TrainingPage from "./TrainingPage";

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
      </Routes>
    </>
  );
};

export default Root;
