import { Routes } from "./routes";
import { AuthProvider } from "./context/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
