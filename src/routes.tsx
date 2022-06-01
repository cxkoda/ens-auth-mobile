import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Verifier from "./Verifier";
import Prover from "./Prover";

export const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/prover" element={<Prover />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default MyRouter;
