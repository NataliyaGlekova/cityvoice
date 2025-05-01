import React, { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { login } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router";
import { loginFormSchema } from "../../../entities/user/model/schema";
import { LoginFormT } from "../../../entities/user/model/types";

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormT>({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Валидация с помощью Zod
    const result = loginFormSchema.safeParse(formData);

    if (!result.success) {
      // Собираем ошибки
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors); // Устанавливаем ошибки
    } else {
      setErrors({}); // Если ошибок нет, очищаем ошибки
      void dispatch(login(formData)); // Отправляем данные логина
      setFormData({ login: "", password: "" });
      navigate("/");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">🔐 authorizatios</Card.Title>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="login">
              <Form.Label style={{ fontSize: "1.1rem" }}>Login</Form.Label>
              <Form.Control
                type="login"
                placeholder="login"
                value={formData.login}
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
                }
              />
              {errors.login && (
                <div className="text-danger">{errors.login}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="Password">
              <Form.Label style={{ fontSize: "1.1rem" }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <div className="text-danger">{errors.hashedPass}</div>
              )}
            </Form.Group>

            <div className="text-center">
              <Button type="submit">LogIn</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
