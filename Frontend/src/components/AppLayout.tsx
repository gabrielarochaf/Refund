import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="w-screen h-screen bg-gray-400 flex flex-col items-center texte-gray-100">
      <main className="p-3 w-full md:w-auto">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
