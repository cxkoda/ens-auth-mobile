import QrReader from "react-web-qr-reader";

export default function Scanner({
  onRead,
}: {
  onRead: (data: string) => void;
}) {
  const delay = 500;

  const previewStyle = {
    height: 320,
    width: 320,
  };

  const handleScan = (result: any) => {
    if (result !== null) {
      onRead(result.data);
      console.log(result.data);
    }
  };

  const handleError = (error: string) => {
    console.log(error);
  };

  return (
    <QrReader
      delay={delay}
      style={previewStyle}
      onError={handleError}
      onScan={handleScan}
      className="reader-container"
      facingMode="environment"
    />
  );
}
