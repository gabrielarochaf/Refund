import { BrowserRouter } from "react-router-dom";

// import { AuthRoutes } from "./Auth-routes";
// import { EmployeeRoutes } from "./Employee-rouths";
import { ManagerRoutes } from "./Manager-routes";
import { Loading } from "../components/Loading";
import { EmployeeRoutes } from "./Employee-rouths";
import { AuthRoutes } from "./Auth-routes";

const isLoading = false;
// const session = undefined;
const session = {
  user: {
    role: "",
  },
};

export function Routes() {
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
