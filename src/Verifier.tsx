import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import QRCode from "qrcode";
import { useParams } from "react-router-dom";

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
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const generateQR = () => {
    const message = Math.random().toString();
    let qrCodeDataUrl;
    QRCode.toDataURL(message, { version: 2 }, function (err: any, url: any) {
      qrCodeDataUrl = url;
    });
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
    </div>
  );
}

export function Verifier({ message }: { message: string }) {
  return <div></div>;
}
