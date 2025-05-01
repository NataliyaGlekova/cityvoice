import { Navigate, Outlet } from "react-router";

type ProtectedRouteProps = {
  children?: React.JSX.Element;
  isAllowed: boolean;
  redirectPath?: string;
};

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectPath = "/",
}: ProtectedRouteProps): React.JSX.Element {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return children || <Outlet />;
}
