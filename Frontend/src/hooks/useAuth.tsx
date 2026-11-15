import { use } from "react";

import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = use(AuthContext);

  return context;
}
