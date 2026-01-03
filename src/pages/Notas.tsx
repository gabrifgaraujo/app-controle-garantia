import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import MenuLateral from "../components/MenuLateral";
import Nota, { type NotaProps } from "../components/Nota";
import "../style/Notas.css";
import {
  AiOutlineFileText,
  AiOutlineCheckCircle,
  AiOutlineDown,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
  AiOutlineFilter
} from "react-icons/ai";

type StatusGarantia = "Ativa" | "A Expirar" | "Expirada";

const Notas = () => {
  const [busca, setBusca] = useState("");
  const [notas, setNotas] = useState<NotaProps[]>([]);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState<StatusGarantia[]>([]);
  const [abrirDropdown, setAbrirDropdown] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    email: "",
    avatar: null as string | null
  });

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) setUsuarioLogado(JSON.parse(usuario));
  }, []);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) return;

    const { email } = JSON.parse(usuario);
    const storageKey = `notas_${email}`;

    const notasSalvas = localStorage.getItem(storageKey);
    if (notasSalvas) setNotas(JSON.parse(notasSalvas));
  }, []);

  const calcularStatusGarantia = (
    dataCompra: string,
    duracaoGarantia: string
  ): StatusGarantia => {
    const [dia, mes, ano] = dataCompra.split("/");
    const dataCompraObj = new Date(`${ano}-${mes}-${dia}`);
    const meses = Number(duracaoGarantia);

    const dataExp = new Date(dataCompraObj);
    dataExp.setMonth(dataExp.getMonth() + meses);

    const hoje = new Date();
    const diasRestantes =
      (dataExp.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);

    if (diasRestantes < 0) return "Expirada";
    if (diasRestantes <= 30) return "A Expirar";
    return "Ativa";
  };

  const estatisticas = useMemo(() => {
    return {
      total: notas.length,
      ativas: notas.filter(
        nota =>
          calcularStatusGarantia(
            nota.dataCompra,
            nota.duracaoGarantia
          ) === "Ativa"
      ).length,
      proximasExpirar: notas.filter(
        nota =>
          calcularStatusGarantia(
            nota.dataCompra,
            nota.duracaoGarantia
          ) === "A Expirar"
      ).length,
      expiradas: notas.filter(
        nota =>
          calcularStatusGarantia(
            nota.dataCompra,
            nota.duracaoGarantia
          ) === "Expirada"
      ).length
    };
  }, [notas]);

  const toggleFiltro = (status: StatusGarantia) => {
    setFiltrosSelecionados(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const toggleTodos = () => {
    setFiltrosSelecionados(prev =>
      prev.length === 3 ? [] : ["Ativa", "A Expirar", "Expirada"]
    );
  };

  const notasFiltradas = useMemo(() => {
    return notas.filter(nota => {
      const matchBusca = nota.produto
        .toLowerCase()
        .includes(busca.toLowerCase());

      if (!matchBusca) return false;

      if (filtrosSelecionados.length === 0) return true;

      const status = calcularStatusGarantia(
        nota.dataCompra,
        nota.duracaoGarantia
      );

      return filtrosSelecionados.includes(status);
    });
  }, [notas, busca, filtrosSelecionados]);

  return (
    <MenuLateral
      currentPage="Visualizar Notas"
      nome={usuarioLogado.nome}
      email={usuarioLogado.email}
      avatar={usuarioLogado.avatar}
    >
      <div className="pagina-lista">
        <header className="cabecalho-pagina">
          <div className="cabecalho-texto">
            <h1>Notas Fiscais</h1>
            <p>Gerencie e acompanhe todas as suas notas fiscais cadastradas</p>
          </div>

          <Link to="/cadastro-nota" className="btn-nova-nota">
            + Nova Nota Fiscal
          </Link>
        </header>

        <div className="estatisticas-grid">
          <div className="card-estatistica card-total">
            <div className="card-icone">
              <AiOutlineFileText />
            </div>
            <div className="card-info">
              <span className="card-label">Total</span>
              <span className="card-valor">{estatisticas.total}</span>
            </div>
          </div>

          <div className="card-estatistica card-ativas">
            <div className="card-icone">
              <AiOutlineCheckCircle />
            </div>
            <div className="card-info">
              <span className="card-label">Ativas</span>
              <span className="card-valor">{estatisticas.ativas}</span>
            </div>
          </div>

          <div className="card-estatistica card-proximas">
            <div className="card-icone">
              <AiOutlineClockCircle />
            </div>
            <div className="card-info">
              <span className="card-label">A Expirar</span>
              <span className="card-valor">
                {estatisticas.proximasExpirar}
              </span>
            </div>
          </div>

          <div className="card-estatistica card-expiradas">
            <div className="card-icone">
              <AiOutlineCloseCircle />
            </div>
            <div className="card-info">
              <span className="card-label">Expiradas</span>
              <span className="card-valor">{estatisticas.expiradas}</span>
            </div>
          </div>
        </div>

 

<div className="secao-filtros">
  <div className="filtro-dropdown">
    <button
      className="btn-icone-filtro"
      onClick={() => setAbrirDropdown(prev => !prev)}
    >
      <AiOutlineDown /> Filtrar por status
    </button>

    {abrirDropdown && (
      <div className="opcoes-filtro-card">
        <label className="filtro-item">
          <input
            type="checkbox"
            checked={filtrosSelecionados.length === 3}
            onChange={toggleTodos}
          />
          Todas
        </label>

        {(["Ativa", "A Expirar", "Expirada"] as StatusGarantia[]).map(
          status => (
            <label key={status} className="filtro-item">
              <input
                type="checkbox"
                checked={filtrosSelecionados.includes(status)}
                onChange={() => toggleFiltro(status)}
              />
              {status}
            </label>
          )
        )}
      </div>
    )}
  </div>

  <input
    type="text"
    className="input-busca"
    placeholder="Buscar por produto..."
    value={busca}
    onChange={e => setBusca(e.target.value)}
  />
</div>

        <div className="container-notas">
          {notasFiltradas.length === 0 ? (
            <div className="sem-notas">
              <div className="icone-vazio">
                <AiOutlineFileText />
              </div>
              <p>Nenhuma nota encontrada</p>
              <span>Adicione novas notas ou ajuste os filtros</span>
            </div>
          ) : (
            notasFiltradas.map((nota, index) => (
              <Nota
                key={index}
                {...nota}
                statusGarantia={calcularStatusGarantia(
                  nota.dataCompra,
                  nota.duracaoGarantia
                )}
              />
            ))
          )}
        </div>
      </div>
    </MenuLateral>
  );
};

export default Notas;
