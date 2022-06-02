import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import ChallengeVerifier from "./ChallengeVerifier";
import Prover from "./Prover";

export const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/verifier/" element={<ChallengeVerifier />} />
        <Route path="/verifier/:tokenAddress" element={<ChallengeVerifier />} />
        <Route path="/prover/:ens" element={<Prover />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default MyRouter;
