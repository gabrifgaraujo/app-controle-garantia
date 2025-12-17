import { useState } from "react";
import { Link } from "react-router-dom";
import type { NotaModel } from "../types/NotaModel";
import NotaFiscal from "../components/Nota";
import SearchBar from "../components/SearchBar";
import "../style/Notas.css";

const Notas = () => {


 const [notasFiltradas, setNotasFiltradas] = useState<NotaModel[]>(() => {
    const dados = localStorage.getItem("notas_fiscais");
    return dados ? JSON.parse(dados) : [];
  });

  return (
    <div className="pagina-lista">
      
    

      <header className="topo-notas">
        <Link to="/notas" className="logo">
          <h1 className="logo-app">Controle de Garantias</h1>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button onClick={
            () => { window.location.href = "/" }
          } className="btn-sair">← Sair</button>
        </div>
      </header>

    
      <section className="cabecalho-lista">
        <h2>Minhas Notas Fiscais</h2>
        <p>Veja todas as notas fiscais cadastradas abaixo.</p>

        <div
          style={{
            display: "flex",
            alignItems: "space-between",
            justifyContent: "left",
            marginTop: "14px",
            gap: "14px",
          }}
        >
          <button className="btn-nova-nota" >
            <Link
              to="/cadastro-nota"
              style={{ color: "white", textDecoration: "none" }}
            >
              + Nova Nota Fiscal
            </Link>
          </button>

            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
        <SearchBar onResult={setNotasFiltradas} />
      </div>

        </div>
      </section>

      <div className="container-notas">

        {notasFiltradas.length === 0 ? (
          <p className="nenhuma-nota">Nenhuma nota fiscal cadastrada.</p>
        ) : (
          notasFiltradas.map((nota, index) => (
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
