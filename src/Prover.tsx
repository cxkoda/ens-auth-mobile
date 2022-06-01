import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import QRCode from "qrcode";
import { useParams } from "react-router-dom";
import Scanner from "./Scanner";

const verifyMessage = async ({
  message,
  address,
  signature,
}: {
  message: string;
  address: string;
  signature: string;
}) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function Prover() {
  const [ens, setENS] = useState("cxkoda.eth");
  const [sigQR, setSigQR] = useState("");

  const sign = async (message: string) => {
    let account = "";

    if (typeof window.ethereum !== "undefined") {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          account = accounts[0];
        })
        .catch((err: { code: number }) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    } else {
      alert("Unable to detect metamask.");
    }

    const provider = new ethers.providers.Web3Provider(
      window.ethereum as ethers.providers.ExternalProvider
    );
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);

    console.log(signature);

    QRCode.toDataURL(
      signature + ";" + ens,
      { version: 10, errorCorrectionLevel: "L" },
      function (err: any, url: any) {
        setSigQR(url);
        console.log(url);
      }
    );
  };

  return (
    <div>
      <Scanner onRead={sign} />
      <img src={sigQR} />
    </div>
  );
}