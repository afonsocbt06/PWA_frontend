import { useForm } from "react-hook-form";
import { Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import _ from "lodash";
import styles from "./styles.module.scss";
import { login } from "../../services/api/auth";

const LoginForm = ({ title, role, data }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const authenticate = (data) => {
    login({ ...data, expectedRole: role })
      .then((response) => {
        if (response.auth) {
          const roles = Array.isArray(response.role)
            ? response.role
            : response.role
              ? [response.role]
              : [];
          const isAdmin = roles.some(
            (value) => String(value).toLowerCase() === "admin",
          );

          navigate(isAdmin ? "/admin" : "/user", { replace: true });
        } else {
          alert(response.message || "Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message || "Login failed");
      });
  };

  const onSubmit = (data) => authenticate(data);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      authenticate(data);
    }
  }, [data]);

  return (
    <Row align="middle" justify="center">
      <div className={styles.loginForm}>
        <h2>{title}</h2>
        <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              required
              {...register("name")}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              {...register("password")}
            />
          </div>
          <input className="submit" type="submit" />
        </form>
      </div>
    </Row>
  );
};

export default LoginForm;
