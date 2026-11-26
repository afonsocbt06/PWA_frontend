import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Qrcode from "../../../QrcodeCreate";

function Perfil({ user = {} }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    // reset form with user data
    reset(user);
  }, [user]);

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Perfil</h3>
          <div className={styles.container}>
            <form
              className={styles.form}
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  required
                  {...register("name")}
                />
              </div>
              {/* ...campos do formulário (password, email, age, address, country,... ) */}
              <Row>
                <input className="submit" type="submit" />
              </Row>
            </form>
          </div>
        </Col>
        <Col>
          <div className={styles.qrCodeContainer}>
            <h2>Code Login</h2>
            <Qrcode user={user} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
