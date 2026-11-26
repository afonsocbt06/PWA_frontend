import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styles from "./styles.module.scss";
import { createQrToken } from "../../services/api/auth";

function Qrcode() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const refreshQrToken = async () => {
      try {
        const qrToken = await createQrToken();
        if (active) {
          setValue(qrToken);
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message || "Could not load QR code");
        }
      }
    };

    refreshQrToken();
    const intervalId = window.setInterval(refreshQrToken, 45_000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.qrCodeCreate}>
      {error ? (
        <p role="alert">{error}</p>
      ) : value ? (
        <QRCode
          size={64}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox="0 0 64 64"
        />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
}

export default Qrcode;
