import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
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

export default function Verifier({ message }: { message: string }) {
  // const [sigData, setSigData] = useState("0x0asdfasdf;cxkoda.eth");
  const [result, setResult] = useState("");

  const verifyData = async (data: string) => {
    setResult(await doVerifyData(data));
  };

  const doVerifyData = async (data: string) => {
    const [signature, ens] = data.split(";");
    const signer = ethers.utils.verifyMessage(message, signature);

    const provider = ethers.getDefaultProvider();
    var authAddress = await provider.resolveName("auth." + ens);

    if (signer !== authAddress) {
      return `Auth/Signer mismatch: ${authAddress}/${signer}`;
    }

    // var wallet = await provider.resolveName("auth." + ens);

    return "Success";
  };

  return (
    <div>
      {result === "" && <Scanner onRead={verifyData} />}
      {result !== "" && <p>result</p>}
    </div>
  );
}
