import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { createGame, getGames } from "../../../../services/api/games";
import { TabContext } from "../../contexts";

const Games = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data, load } = useGetData(getGames, 0, 0);
  const { isLoadingPost, addData } = usePostData(createGame);
  const { setGamesCount } = useContext(TabContext);

  useEffect(() => {
    setGamesCount(data.data.length);
  }, [data, setGamesCount]);

  const addGame = async (formData) => {
    try {
      await addData(formData);
      await load();
      alert("Pedido Efetuado com sucesso");
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Create Game</h3>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(addGame)}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="date">
                  Date:
                </label>
                <input
                  data-testid="date"
                  placeholder="date"
                  id="date"
                  type="date"
                  name="date"
                  required="required"
                  {...register("date")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  name="name"
                  required="required"
                  {...register("name")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="image">
                  Image:
                </label>
                <input
                  id="image"
                  name="image"
                  required="required"
                  {...register("image")}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="teamVisitor">
                  Visitor :
                </label>
                <input id="teamVisitor" name="teamVisitor" {...register("team.visitor")} />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="home">
                  Home :
                </label>
                <input
                  id="home"
                  name="home"
                  required="required"
                  {...register("team.home")}
                />
              </div>
              <Row>
                <input
                  data-testid="submitButton"
                  className="submit"
                  type="submit"
                  disabled={isLoadingPost}
                />
              </Row>
            </form>
          </div>
        </Col>
        <Col>
          <Table columns={["date", "name", "image", "team.visitor", "team.home"]} rows={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
