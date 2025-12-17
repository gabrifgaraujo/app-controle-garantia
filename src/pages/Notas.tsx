import { useState } from "react";
import { Link } from "react-router-dom";
import type { NotaModel } from "../types/NotaModel";
import NotaFiscal from "../components/Nota";
import SearchBar from "../components/SearchBar";
import { carregarNotas } from "../services/Service";

import "../style/Notas.css";

const Notas = () => {
  const [notas] = useState<NotaModel[]>(() => carregarNotas());
  const [notasFiltradas, setNotasFiltradas] = useState<NotaModel[]>(() =>
    carregarNotas()
  );

  return (
    <div className="pagina-lista">
      <header className="topo-notas">
        <Link to="/notas" className="logo"> <h1 className="logo-app">Controle de Garantias</h1>
        </Link>

        <button
          className="btn-sair"
          onClick={() => (window.location.href = "/")}
        >
          ← Sair
        </button>
      </header>

      <section className="cabecalho-lista">
        <h2>Minhas Notas Fiscais</h2>
        <p>Veja todas as notas fiscais cadastradas abaixo.</p>

        <div style={{ display: "flex", gap: "14px", marginTop: "14px" }}>
          <Link to="/cadastro-nota" className="btn-nova-nota">
            + Nova Nota Fiscal
          </Link>

          <SearchBar
            notas={notas}
            onResult={setNotasFiltradas}
          />
        </div>
      </section>

      <div className="container-notas">
        {notasFiltradas.length === 0 ? (
          <p className="nenhuma-nota">
            Nenhuma nota fiscal encontrada.
          </p>
        ) : (
          notasFiltradas.map((nota) => (
            <NotaFiscal
              key={nota.numeroNota}
              produto={nota.produto}
              descricao={nota.descricao}
              dataCompra={nota.dataCompra}
              duracaoGarantia={nota.duracaoGarantia}
              statusGarantia={nota.statusGarantia}
              tipoNota={nota.tipoNota}
              loja={nota.loja}
              numeroNota={nota.numeroNota}
              valor={nota.valor}
              observacoes={nota.observacoes}
              arquivo={nota.arquivo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notas;
