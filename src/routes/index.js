import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import NewOccurrence from "../pages/new-occurrence";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-occurrence" element={<NewOccurrence />} />
    </Routes>
  );
}
