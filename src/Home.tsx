import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useState, useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const [tokenAddress, setTokenAddress] = useState(
    "0x1cA15CCdd91b55CD617a48dC9eEFb98CAe224757"
  );
  const [ens, setEns] = useState("auth.cxkoda.eth");

  const handleVerifier = (event: any) => {
    event.preventDefault();

    if (tokenAddress !== "" && !ethers.utils.isAddress(tokenAddress)) {
      alert("Invalid token contract address!");
      return;
    }

    navigate("/verifier/" + tokenAddress);
  };

  const handleProver = (event: any) => {
    event.preventDefault();

    if (!ens.startsWith("auth")) {
      alert(`Invalid ENS subdomain (must begin with auth)`);
      return;
    }

    navigate("/prover/" + ens);
  };

  return (
    <div className="Home">
      <form onSubmit={handleVerifier}>
        <label>
          Token address
          <input
            name="tokenAddress"
            type="text"
            value={tokenAddress}
            onChange={(e: any) => {
              setTokenAddress(e.target.value);
            }}
          />
        </label>

        <button type="submit">Open verifier</button>
      </form>

      <form onSubmit={handleProver}>
        <label>
          Auth ENS
          <input
            name="ens"
            type="text"
            value={ens}
            onChange={(e: any) => {
              setEns(e.target.value);
            }}
          />
        </label>

        <button type="submit">Open prover</button>
      </form>
    </div>
  );
}

export default Home;
