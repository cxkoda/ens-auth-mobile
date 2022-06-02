import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import { BrowserQRCodeReader } from "@zxing/browser";

export default function Scanner({
  onRead,
}: {
  onRead: (data: string) => void;
}) {
  const previewStyle = {
    height: 320,
    width: 320,
  };

  return (
    <>
      <QrReader
        constraints={{
          facingMode: "environment",
          aspectRatio: 1,
          sampleRate: 200,
        }}
        videoStyle={previewStyle}
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
