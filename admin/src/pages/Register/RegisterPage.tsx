import React from "react";
import { Container } from "react-bootstrap";
import RegisterForm from "../../features/Register/ui/RegisterForm";

export default function RegisterPage(): React.JSX.Element {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
}
