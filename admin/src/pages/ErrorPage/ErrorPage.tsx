import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ErrorPage(): React.JSX.Element {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Card>
        <h1 style={{ fontSize: "3rem", color: "#f57f17" }}>Error 404</h1>
        <p style={{ fontSize: "1.3rem", marginBottom: "2rem" }}>
          Страница не найдена
        </p>
        <Button onClick={goHome}>На главную</Button>
      </Card>
    </Container>
  );
}
