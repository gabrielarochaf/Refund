import { BrowserRouter } from "react-router-dom";
import { ManagerRoutes } from "./Manager-routes";
import { Loading } from "../components/Loading";
import { EmployeeRoutes } from "./Employee-rouths";
import { AuthRoutes } from "./Auth-routes";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <ManagerRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
