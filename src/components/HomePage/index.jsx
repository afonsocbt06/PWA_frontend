import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Row, Col, Container } from "reactstrap";
import LoginForm from "../LoginForm";
import QrRead from "../QrcodeRead";

const HomePage = () => {
  const [showQRCode, setQrCode] = useState(false);
  const [dataQrCode, setDataQrCode] = useState({});

  return (
    <Container>
      <section className={styles.modelPanel} aria-label="Copilot model selector">
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            <span className={styles.copilotIcon} aria-hidden="true">
              ✿
            </span>
            <strong>Copilot</strong>
          </div>
          <span className={styles.addButton} aria-hidden="true">+</span>
          <span className={styles.searchIcon} aria-hidden="true" />
        </div>

        <div className={styles.selectedModel}>
          <span className={styles.checkmark} aria-hidden="true">✓</span>
          <span className={styles.modelName}>Copilot Fusion</span>
          <span className={styles.recommended}>Recommended</span>
          <span className={styles.modelTier}>Standard</span>
          <span className={styles.chevron} aria-hidden="true">›</span>
        </div>

        <p className={styles.panelDescription}>
          Picks or combines the best models for your task
        </p>

        <p className={styles.upgradeHeading}>Upgrade for More Models</p>
        <div className={styles.upgradeModel}>
          <span>Claude Sonnet 5.5</span>
          <span className={styles.upgradeButton}>Upgrade</span>
        </div>
        <div className={styles.upgradeModel}>
          <span>GPT-6 Luna</span>
          <span className={styles.upgradeButton}>Upgrade</span>
        </div>
        <div className={styles.upgradeModel}>
          <span>GPT-6.1 Sol</span>
          <span className={styles.upgradeButton}>Upgrade</span>
        </div>
      </section>

      <Row className={styles.row}>
        <Col className={styles.col}>
          <LoginForm title="Admin" role="admin" />
        </Col>
        <Col className={styles.col}>
          <LoginForm title="User" role="user" data={dataQrCode} />
          <div className={styles.qrContainer}>
            {showQRCode && <QrRead setDataLogin={setDataQrCode} />}
            <button onClick={() => setQrCode(!showQRCode)}>
              Login with Qr Code
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
