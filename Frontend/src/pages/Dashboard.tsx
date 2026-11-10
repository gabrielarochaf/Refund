import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import searchSvg from "../assets/search.svg";
import { RefundItem, type RefundItemProps } from "../components/RefundItem";

import { CATEGORIES } from "../utils/categories";
import { FormatCurrency } from "../utils/FormatCurrency";
import Pagination from "../components/Pagination";

const REFUND_EXEMPLE: RefundItemProps[] = [
  {
    id: "123",
    name: "Uber para reunião com cliente",
    category: "Transport",
    amount: FormatCurrency(34.5),
    categoryImg: CATEGORIES["transport"].icon,
  },
  {
    id: "124",
    name: "Almoço durante viagem",
    category: "Food",
    amount: FormatCurrency(58.9),
    categoryImg: CATEGORIES["food"].icon,
  },
  {
    id: "125",
    name: "Estacionamento aeroporto",
    category: "Transport",
    amount: FormatCurrency(42),
    categoryImg: CATEGORIES["transport"].icon,
  },
  {
    id: "126",
    name: "Hospedagem em São Paulo",
    category: "Accommodation",
    amount: FormatCurrency(389.9),
    categoryImg: CATEGORIES["accomodation"].icon,
  },
  {
    id: "127",
    name: "Passagem de ônibus Goiânia-Brasília",
    category: "Transport",
    amount: FormatCurrency(95),
    categoryImg: CATEGORIES["transport"].icon,
  },
  {
    id: "128",
    name: "Jantar com equipe do projeto",
    category: "Food",
    amount: FormatCurrency(127.4),
    categoryImg: CATEGORIES["food"].icon,
  },
];

export function Dashboard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalOfPages, setTotalOfPages] = useState(10);
  const [refunds, setRefunds] = useState<RefundItemProps[]>(REFUND_EXEMPLE)

  function fetchRedunds(e: React.SubmitEvent) {
    e.preventDefault();
    console.log(name);
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalOfPages) {
        return prevPage + 1;
      }
      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }
  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-3xl ">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        onSubmit={fetchRedunds}
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Search by name"
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="Search Icon" className="w-5" />
        </Button>
      </form>

      <div className="my-6 flex flex-col gap-4 max-h-85.5 overflow-y-scroll">
        {refunds.map((item) =>(
          <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
        ))}
      </div>

      <Pagination
        current={page}
        total={totalOfPages}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}
