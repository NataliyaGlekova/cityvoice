import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../widgets/NavBar/ui/NavBar";

export default function Layout(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
