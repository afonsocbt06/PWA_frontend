import styles from "./styles.module.scss";

const Title = ({ text, isSecondary = false }) => (
  <h1 className={isSecondary ? styles.secondary : undefined}>{text}</h1>
);

export default Title;
