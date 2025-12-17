import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Nota, { type NotaProps } from "../components/Nota";
import "../style/Notas.css";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";

// Tipagem das notificações
type Notificacao = {
  id: string;
  produto: string;
  dataCompra: string;
  duracaoGarantia: string;
  tipo: "Expirada" | "Próxima de Expirar";
  lida: boolean;
};

const Notas = () => {
  const [busca, setBusca] = useState("");
  const [modalNotificacoes, setModalNotificacoes] = useState(false);
  const [notas, setNotas] = useState<NotaProps[]>([]);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const navigate = useNavigate();

  // Bloquear scroll com modal aberto
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = modalNotificacoes ? "hidden" : "auto";
    }
  }, [modalNotificacoes]);

  // Carrega notas do localStorage
  useEffect(() => {
    const notasSalvas = localStorage.getItem("notas");
    if (notasSalvas) {
      const listaNotas: NotaProps[] = JSON.parse(notasSalvas);
      setNotas(listaNotas);
    }
  }, []);

  // Calcula status da garantia
  const calcularStatusGarantia = (dataCompra: string, duracaoGarantia: string) => {
    if (!dataCompra || !duracaoGarantia) return "Ativa";

    const [dia, mes, ano] = dataCompra.split("/");
    const dataCompraObj = new Date(`${ano}-${mes}-${dia}`);
    const meses = parseInt(duracaoGarantia, 10);
    const dataExp = new Date(dataCompraObj);
    dataExp.setMonth(dataExp.getMonth() + meses);

    return new Date() > dataExp ? "Expirada" : "Ativa";
  };

  // Gera notificações com base nas notas
  useEffect(() => {
    const hoje = new Date();
    const novasNotificacoes = notas
      .map((nota) => {
        const [dia, mes, ano] = nota.dataCompra.split("/");
        const dataCompraObj = new Date(`${ano}-${mes}-${dia}`);
        const meses = parseInt(nota.duracaoGarantia, 10);
        const dataExp = new Date(dataCompraObj);
        dataExp.setMonth(dataExp.getMonth() + meses);

        const diasRestantes = (dataExp.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);
        let tipo: Notificacao["tipo"] | "" = "";

        if (diasRestantes < 0) tipo = "Expirada";
        else if (diasRestantes <= 30) tipo = "Próxima de Expirar";

        if (!tipo) return null;

        return {
          id: nota.numeroNota,
          produto: nota.produto,
          dataCompra: nota.dataCompra,
          duracaoGarantia: nota.duracaoGarantia,
          tipo,
          lida: false,
        };
      })
      .filter((n): n is Notificacao => n !== null);

    setNotificacoes(novasNotificacoes);
  }, [notas]);

  // Filtra notas com base na busca
  const notasFiltradas = notas.filter((nota) =>
    nota.produto.toLowerCase().includes(busca.toLowerCase())
  );

  // Marca uma notificação como lida/não lida
  const marcarComoLida = (index: number) => {
    setNotificacoes((prev) =>
      prev.map((n, i) => (i === index ? { ...n, lida: !n.lida } : n))
    );
  };

  // Marca todas as notificações como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const handleSair = () => {
    Swal.fire({
      title: "Deseja realmente sair da sua conta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <div className="pagina-lista">
      <header className="topo-notas">
        <h1 className="logo-app">Controle de Garantias</h1>
        <button className="btn-sair" onClick={handleSair}>Sair</button>
      </header>

      <section className="cabecalho-lista">
        <h2>Minhas Notas Fiscais</h2>
        <p>Veja todas as notas fiscais cadastradas abaixo.</p>

        <div className="cabecalho-controles">
          <Link to="/cadastro-nota" className="btn-nova-nota">
            + Nova Nota Fiscal
          </Link>

          <input
            type="text"
            placeholder="Buscar nota..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-busca"
          />

          <div className="icone-notificacao">
            <button
              className="btn-notificacao"
              onClick={() => setModalNotificacoes(true)}
            >
              <IoNotificationsOutline />
            </button>

            {notificacoes.some((n) => !n.lida) && (
              <span className="notificacao-alerta"></span>
            )}
          </div>
        </div>
      </section>

      <div className="container-notas">
        {notasFiltradas.length > 0 ? (
          notasFiltradas.map((nota, index) => {
            const statusGarantia = calcularStatusGarantia(nota.dataCompra, nota.duracaoGarantia);
            const duracaoExibicao = `${nota.duracaoGarantia}`;
            return (
              <Nota
                key={index}
                {...nota}
                statusGarantia={statusGarantia}
                duracaoGarantia={duracaoExibicao}
              />
            );
          })
        ) : (
          <p className="sem-notas">Não há notas fiscais cadastradas</p>
        )}
      </div>

      {modalNotificacoes && (
        <div className="modal-overlay" onClick={() => setModalNotificacoes(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-fechar" onClick={() => setModalNotificacoes(false)}>×</button>
            <h2 className="modal-titulo">Notificações</h2>
            <p className="modal-subtitulo">Notas próximas de expirar ou expiradas</p>

            <button className="btn-marcar-todas" onClick={marcarTodasComoLidas}>
              <AiOutlineCheckCircle /> Marcar todas
            </button>

            <div className="info-modal">
              {notificacoes.length === 0 && <p>Nenhuma notificação</p>}

              {notificacoes.map((nota, index) => (
                <div key={index} className={`item-notificacao ${nota.lida ? "lida" : "nao-lida"}`}>
                  <div>
                    <p>
                      <strong>{nota.produto}</strong> –{" "}
                      <span className={`tipo-notificacao ${nota.tipo === "Expirada" ? "expirada" : "proxima"}`}>
                        {nota.tipo}
                      </span>
                    </p>
                    <p className="info-nota">
                      Compra: {nota.dataCompra} | Garantia: {nota.duracaoGarantia} meses
                    </p>
                  </div>
                  <button className="btn-lida" onClick={() => marcarComoLida(index)}>
                    <AiOutlineCheck />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notas;
