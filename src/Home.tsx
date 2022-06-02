import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <input
        type="button"
        value="Verifier"
        className="goto-button"
        onClick={() => {
          navigate("/verifier");
        }}
      />
      <input
        type="button"
        value="Prover"
        className="goto-button"
        onClick={() => {
          navigate("/prover");
        }}
      />
    </div>
  );
}

export default Home;
