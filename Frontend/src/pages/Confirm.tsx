import { Navigate, useLocation } from "react-router-dom";
import OksSvg from "../assets/ok.svg";

export function Confirm() {
  const location = useLocation();

  if (!location.state?.fromSubmit) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-500 lg:w-lg rounded-xl flex flex-col items-center p-10 gap-6">
      <h1 className="text-2xl font-bold text-center text-green-100">
        Solicitação Enviada
      </h1>

      <img src={OksSvg} alt="Icone de ok" />

      <p className="text-sm text-gray-200 text-center">
        Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o
        sertor financeiro irá entrar em contato com você!!!
      </p>

      <a
        href="/"
        className="p-3 text-center w-full bg-green-100 rounded-lg 
                text-white hover:bg-gree-200 transition ease-linear"
      >
        Nova solicitação
      </a>
    </div>
  );
}
