import React from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../../features/Login/ui/LoginForm";

export default function LoginPage(): React.JSX.Element {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
