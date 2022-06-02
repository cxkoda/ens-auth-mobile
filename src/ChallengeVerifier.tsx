import { ethers } from "ethers";
import QRCode from "qrcode";

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

  const { message, qrCodeDataUrl } = generateQR();

  return (
    <div>
      <img src={qrCodeDataUrl} />
      <Verifier message={message} />
      <button onClick={refreshPage}>Start over</button>
    </div>
  );
}
