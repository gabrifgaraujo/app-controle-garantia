import { useEffect, useState } from "react";
import type { NotaModel } from "../types/NotaModel";
import "../style/searchBar.css"

interface SearchBarProps {
  onResult: (resultados: NotaModel[]) => void;
}

const SearchBar = ({ onResult }: SearchBarProps) => {
  const [termo, setTermo] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("notas_fiscais");
    if (!dados) {
      onResult([]);
      return;
    }

    const notas: NotaModel[] = JSON.parse(dados);

    const filtradas = notas.filter((nota) =>
      [
        nota.produto,
        nota.descricao,
        nota.loja,
        nota.numeroNota,
      ]
        .join(" ")
        .toLowerCase()
        .includes(termo.toLowerCase())
    );

    onResult(filtradas);
  }, [termo, onResult]);

  return (
    <input
      type="text"
      placeholder="Buscar por produto, loja ou nota..."
      value={termo}
      onChange={(e) => setTermo(e.target.value)}
      className="searchbar"
    />
  );
};

export default SearchBar;
