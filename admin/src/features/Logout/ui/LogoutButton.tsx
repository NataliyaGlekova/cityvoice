import React from "react";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { Button } from "react-bootstrap";
import { logout } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router";

export default function LogoutButton(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Button variant="danger" onClick={logoutHandler}>
      Выйти
    </Button>
  );
}
