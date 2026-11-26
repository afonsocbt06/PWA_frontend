import React, { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import styles from "./styles.module.scss";

const QrcodeRead = ({ setDataLogin }) => {
  const [data, setData] = useState("");
  const hasScanned = useRef(false);

  return (
    <div className={styles.qrCodeReader}>
      <Scanner
        onScan={(results) => {
          const qrToken = results[0]?.rawValue;
          if (!qrToken || hasScanned.current) return;

          hasScanned.current = true;
          setData("QR code lido");
          setDataLogin({ qrToken });
        }}
        onError={(error) => console.log(error?.message)}
        constraints={{
          facingMode: "user",
        }}
        scanDelay={300}
      />
      <p>{data}</p>
    </div>
  );
};

export default QrcodeRead;
