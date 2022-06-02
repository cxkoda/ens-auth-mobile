// import QrReader from "react-web-qr-reader";

// export default function Scanner({
//   onRead,
// }: {
//   onRead: (data: string) => void;
// }) {
//   const delay = 500;

//   const previewStyle = {
//     height: 320,
//     width: 320,
//   };

//   const handleScan = (result: any) => {
//     if (result !== null && result.data !== "") {
//       onRead(result.data);
//       console.log(result.data);
//     }
//   };

//   const handleError = (error: string) => {
//     console.log(error);
//   };

//   return (
//     <QrReader
//       delay={delay}
//       style={previewStyle}
//       onError={handleError}
//       onScan={handleScan}
//       className="reader-container"
//       facingMode="environment"
//     />
//   );
// }

import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import { BrowserQRCodeReader } from "@zxing/browser";

export default function Scanner({
  onRead,
}: {
  onRead: (data: string) => void;
}) {
  return (
    <>
      <QrReader
        constraints={{
          facingMode: "front",
          aspectRatio: 1,
          sampleRate: 500,
          width: 200,
        }}
        // style={{ width: "100%" }}
        onResult={(
          result: Result | undefined | null,
          error: Error | undefined | null,
          codeReader?: BrowserQRCodeReader
        ) => {
          if (!!result) {
            onRead(result?.getText());
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
    </>
  );
}
