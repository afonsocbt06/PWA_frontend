import { useState } from "react";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
import Tickets from "./components/Tickets";
import Member from "./components/Member";
import Perfil from "./components/Perfil";
import styles from "./styles.module.scss";
import { getPerfil } from "../../services/api/perfil";
import { useGetPerfil } from "../../hooks/useGetPerfil";

const UserPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { isError, isLoading, user } = useGetPerfil(getPerfil);

  const navItems = [
    {
      id: "1",
      title: "Perfil",
    },
    {
      id: "2",
      title: "Tickets",
    },
    {
      id: "3",
      title: "Member",
    },
  ];

  const items = [
    {
      id: "1",
      children: <Perfil user={user.data} />,
    },
    {
      id: "2",
      children: <Tickets />,
    },
    {
      id: "3",
      children: <Member user={user.data} />,
    },
  ];

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container className={styles.container}>
      <h1>UserPage</h1>
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => (
            <NavItem key={item.id}>
              <NavLink
                className={item.id === activePage}
                onClick={() => setActivePage(item.id)}
              >
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activePage}>
          {items.map((item) => (
            <TabPane key={item.id} tabId={item.id}>
              {item.children}
            </TabPane>
          ))}
        </TabContent>
      </Row>
    </Container>
  );
};

export default UserPage;
