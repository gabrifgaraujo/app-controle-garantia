import { useState } from "react";
import { Link } from "react-router-dom";
import type { NotaModel } from "../types/NotaModel";
import NotaFiscal from "../components/Nota";
import "../style/Notas.css";

const Notas = () => {

const [notas] = useState<NotaModel[]>(() => {
    const notasCarregadas = localStorage.getItem("notas_fiscais");
    return notasCarregadas ? JSON.parse(notasCarregadas) : [];
  });


  return (
    <div className="pagina-lista">
      <header className="topo-notas">
        <Link to="/notas" className="logo">
          <h1 className="logo-app">Controle de Garantias</h1>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button className="btn-sair">← Sair</button>
        </div>
      </header>

      <section className="cabecalho-lista">
        <h2>Minhas Notas Fiscais</h2>
        <p>Veja todas as notas fiscais cadastradas abaixo.</p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "14px",
            gap: "14px",
          }}
        >
          <button className="btn-nova-nota">
            <Link
              to="/cadastro-nota"
              style={{ color: "white", textDecoration: "none" }}
            >
              + Nova Nota Fiscal
            </Link>
          </button>
        </div>
      </section>

      <div className="container-notas">

        {notas.length === 0 ? (
          <p className="nenhuma-nota">Nenhuma nota fiscal cadastrada.</p>
        ) : (
          notas.map((nota, index) => (
            <NotaFiscal
              key={index}
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
