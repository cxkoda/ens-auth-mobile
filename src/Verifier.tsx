import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import Scanner from "./Scanner";

const ERC721Abi = [
  "function name() view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
];

// const provider = ethers.getDefaultProvider();

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/644a82f96aa445bd96e173960b7d0c31"
);

export default function Verifier({ message }: { message: string }) {
  const { tokenAddress } = useParams();

  if (tokenAddress !== undefined && !ethers.utils.isAddress(tokenAddress)) {
    alert("Invalid token contract address!");
  }

  const token =
    tokenAddress !== undefined
      ? new ethers.Contract(tokenAddress, ERC721Abi, provider)
      : undefined;

  const [AuthenticationState, setAuthenticationState] = useState("");
  const [tokenVerificationState, setTokenVerificationState] = useState("");
  const [processing, setProcessing] = useState(false);

  const verifyData = async (data: string) => {
    if (processing) {
      return;
    }
    setProcessing(true);
    await doVerifyData(data);
    setProcessing(false);
  };

  const doVerifyData = async (data: string) => {
    const [signature, ens] = data.split(";");

    if (!ens.startsWith("auth")) {
      setAuthenticationState(
        `❌ Invalid ENS subdomain: must begin with auth: ${ens}`
      );
      return;
    }

    const signer = ethers.utils.verifyMessage(message, signature);
    var authAddress = await provider.resolveName(ens);

    if (authAddress == null) {
      setAuthenticationState(
        `❌ Invalid ENS subdomain: does not exist: ${ens}`
      );
      return;
    }

    if (signer !== authAddress) {
      setAuthenticationState(
        `❌ Invalid signature: Auth/Signer mismatch: ${authAddress}/${signer}`
      );
      return;
    }
    setAuthenticationState("✅");

    if (!!token) {
      const wallet = await provider.resolveName(ens.split(".", 1)[1]);
      console.log(tokenAddress, wallet);
      const balance = await token.balanceOf(wallet);
      if (balance.gt(0)) {
        setTokenVerificationState("✅");
      } else {
        setTokenVerificationState("❌ insufficient token balance");
        return;
      }
    }
  };

  return (
    <div>
      <Scanner onRead={verifyData} />
      {<p>Authentication: {AuthenticationState}</p>}
      {token && <p>Token: {tokenVerificationState}</p>}
      {processing && <p>⏳ Processing...</p>}
    </div>
  );
}
