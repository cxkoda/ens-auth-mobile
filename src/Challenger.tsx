import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import QRCode from "qrcode";
import { useParams } from "react-router-dom";

import Verifier from "./Verifier";

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

export default function Challenger() {
  const generateQR = () => {
    const message = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    let qrCodeDataUrl;
    QRCode.toDataURL(
      message,
      { version: 10, errorCorrectionLevel: "L" },
      function (err: any, url: any) {
        qrCodeDataUrl = url;
      }
    );
    return { message, qrCodeDataUrl };
  };

  const { message, qrCodeDataUrl } = generateQR();

  // const handleVerification = async (e: any) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   setSuccessMsg("");
  //   setError("");
  //   const isValid = await verifyMessage({
  //     setError,
  //     message: data.get("message"),
  //     address: data.get("address"),
  //     signature: data.get("signature"),
  //   });

  //   if (isValid) {
  //     setSuccessMsg("Signature is valid!");
  //   } else {
  //     setError("Invalid signature");
  //   }
  // };

  return (
    <div>
      <img src={qrCodeDataUrl} />
      <Verifier message={message} />
    </div>
  );
}
