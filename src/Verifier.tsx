import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { provider, getERC721Contract } from "./utils";
import Scanner from "./Scanner";

export default function Verifier({ message }: { message: string }) {
  const { tokenAddress } = useParams();

  if (tokenAddress !== undefined && !ethers.utils.isAddress(tokenAddress)) {
    alert("Invalid token contract address!");
  }

  const token =
    tokenAddress !== undefined ? getERC721Contract(tokenAddress) : undefined;

  const [AuthenticationState, setAuthenticationState] = useState("");
  const [tokenVerificationState, setTokenVerificationState] = useState("");
  const [processing, setProcessing] = useState(false);

  const [walletENS, setWalletENS] = useState("");

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

    const wallet = ens.split(".").slice(1).join(".");
    setWalletENS(wallet);

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
      const walletAddress = await provider.resolveName(wallet);
      console.log(walletAddress);
      console.log(tokenAddress, walletAddress);
      const balance = await token.balanceOf(walletAddress);
      if (balance.gt(0)) {
        setTokenVerificationState("✅");
      } else {
        setTokenVerificationState("❌ insufficient");
        return;
      }
    }
  };

  return (
    <div>
      <Scanner onRead={verifyData} />
      {
        <p>
          Authentication: {walletENS !== "" && `(${walletENS})`}{" "}
          {AuthenticationState}
        </p>
      }
      {token && <p>Token balance: {tokenVerificationState}</p>}
      {processing && <p>⏳ Processing...</p>}
    </div>
  );
}
