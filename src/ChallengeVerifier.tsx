import { ethers } from "ethers";
import QRCode from "qrcode";
import { useParams } from "react-router-dom";

import Verifier from "./Verifier";

export default function ChallengeVerifier() {
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

  function refreshPage() {
    window.location.reload();
  }

  const { tokenAddress } = useParams();
  const { message, qrCodeDataUrl } = generateQR();

  return (
    <div>
      <h3>
        Verifying: authentication{" "}
        {tokenAddress !== undefined && "+ token ownership"}
      </h3>
      <h4>{tokenAddress}</h4>
      <img src={qrCodeDataUrl} className="qr" />
      <Verifier message={message} />
      <button onClick={refreshPage}>Start over</button>
    </div>
  );
}
