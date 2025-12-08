import { useState } from "react";
import { Link } from "react-router-dom";
import Nota from "../components/Nota.tsx";
import "../style/Notas.css";
import notasFiscais from "../mock/notasFiscais.ts";

const Notas = () => {
  const [busca, setBusca] = useState("");
  
  const notasFiltradas = notasFiscais.filter((nota) =>
    nota.produto.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pagina-lista">
      <header className="topo-notas">
        <h1 className="logo-app">Controle de Garantias</h1>

        <Link to="/" className="btn-sair">
          ← Sair
        </Link>
      </header>

      <section className="cabecalho-lista">
        <h2>Minhas Notas Fiscais</h2>
        <p>Veja todas as notas fiscais cadastradas abaixo.</p>

        {/* Controles: botão + busca */}
        <div className="cabecalho-controles">
          <Link to="/cadastro-nota" className="btn-nova-nota">
            + Nova Nota Fiscal
          </Link>

          <input
            type="text"
            placeholder="Buscar nota pelo produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-busca"
          />
        </div>
      </section>

      <div className="container-notas">
        {notasFiltradas.length > 0 ? (
          notasFiltradas.map((nota, index) => (
            <Nota
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
            />
          ))
        ) : (
          <p>Nenhuma nota encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Notas;
