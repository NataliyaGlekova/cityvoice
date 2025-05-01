import React, { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { RegisterFormT } from "../../../entities/user/model/types";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { register } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router";
import { registreFormSchema } from "../../../entities/user/model/schema";

export default function RegisterForm(): React.JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormT>({
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Для хранения ошибок валидации
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Валидация с помощью Zod
    const result = registreFormSchema.safeParse(formData);
    if (!result.success) {
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors); // Устанавливаем ошибки
    } else {
      setErrors({}); // Если ошибок нет, очищаем ошибки
      void dispatch(register(formData));
      navigate("/");
      setFormData({
        email: "",
        name: "",
        password: "",
      });
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        style={{
          width: "28rem",
          backgroundColor: "#fff59d",
          borderRadius: "20px",
          boxShadow: "4px 4px 20px rgba(0,0,0,0.1)",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          padding: "2rem",
        }}
      >
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontSize: "1.8rem" }}
          >
            📒 Регистрация
          </Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Введите имя"
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Введите email"
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </Form.Group>
            <div className="text-center">
              <Button
                variant="warning"
                type="submit"
                style={{ borderRadius: "12px", padding: "0.5rem 2rem" }}
              >
                🚀 Зарегистрироваться
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
