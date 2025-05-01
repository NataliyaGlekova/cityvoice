import React, { useEffect } from "react";
import MainPage from "../../pages/MainPage/MainPage";
import Layout from "../../pages/Layout/Layout";
import { Route, Routes } from "react-router";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import { refresh } from "../../entities/user/model/userThunks";
import LoginPage from "../../pages/Login/LoginPage";
import ProtectedRoute from "../utils/ProtectedRouter";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

export default function RouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    void dispatch(refresh());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={<ProtectedRoute isAllowed={!!user} redirectPath="/login" />}
        >
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
