import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router";
import { useAppSelector } from "../../../shared/lib/hooks";
import LogoutButton from "../../../features/Logout/ui/LogoutButton";
import { FaBook, FaUser } from "react-icons/fa";

export default function NavBar(): React.JSX.Element {
  const userLogin = useAppSelector((state) => state.user.user?.login);

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "white",
            letterSpacing: "2px",
            paddingTop: "0.5rem",
          }}
        >
          City Voice
        </Navbar.Brand>

        {userLogin && (
          <Nav.Link as={Link} to="/places" className="text-warning">
            <FaBook className="me-2" />
            Управление
          </Nav.Link>
        )}

        {/* Мобильный Тогглер */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Элементы навигации справа */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {userLogin !== undefined ? (
              <>
                <Navbar.Text className="text-white">
                  Привет, {userLogin}
                </Navbar.Text>
                <LogoutButton />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-warning">
                  <FaUser className="me-2" />
                  Вход
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/register" className="text-warning">
                  <FaUser className="me-2" />
                  Регистрация
                </Nav.Link> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
