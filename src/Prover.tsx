import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import QRCode from "qrcode";
import { useParams } from "react-router-dom";
// import QrScanner from "qr-scanner";

import QrReader from "react-web-qr-reader";

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
  const delay = 500;

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const [result, setResult] = useState("No result");

  const handleScan = (result: string | null) => {
    if (result) {
      setResult(result);
      console.log(result);
    }
  };

  const handleError = (error: string) => {
    console.log(error);
  };

  return (
    <>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        className="reader-container"
        facingMode="environment"
      />
    </>
  );
}
