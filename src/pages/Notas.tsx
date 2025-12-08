import { Link } from "react-router-dom";
import Nota from "../components/Nota.tsx";
import "../style/Notas.css";
import notasFiscais from "../mock/notasFiscais.ts"

const Notas = () => {
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
        <button className="btn-nova-nota">
          <Link to="/cadastro-nota">+ Nova Nota Fiscal</Link>
        </button>
      </section>

      <div className="container-notas">
        {notasFiscais.map((nota, index) => (
          <Nota
            key={index}
            produto={nota.produto}
            descricao={nota.descricao}
            dataCompra={nota.dataCompra}
            duracaoGarantia={nota.duracaoGarantia}
            statusGarantia={nota.statusGarantia}
          />
        ))}
      </div>
    </div>
  );
};

export default Notas;
