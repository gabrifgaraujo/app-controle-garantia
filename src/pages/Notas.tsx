// Hooks do React
import { useState, useEffect } from "react";
// Navegação entre rotas
import { Link, useNavigate } from "react-router-dom";
// Alertas estilizados
import Swal from "sweetalert2";
// Componentes de nota fiscal
import Nota from "../components/Nota";
// Mock de notas fiscais
import notasFiscais from "../mock/notasFiscais";
// Estilos de página
import "../style/Notas.css";
// Ícones
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
  // Texto digitado na busca
  const [busca, setBusca] = useState("");
  // Controle do modal de notificações
  const [modalNotificacoes, setModalNotificacoes] = useState(false);
  // Controle de navegação
  const navigate = useNavigate();

  // Bloquear scroll com modal aberto
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = modalNotificacoes ? "hidden" : "auto";
    }
  }, [modalNotificacoes]);

  // Gera notificações com base nas notas fiscais
  const gerarNotificacoes = (): Notificacao[] => {
    // Data atual para comparação
    const hoje = new Date("2024-09-01");

    return notasFiscais
      .map((nota) => {
        // Converter dataCompra para objeto Date
        const [dia, mes, ano] = nota.dataCompra.split("/");
        const dataCompra = new Date(`${ano}-${mes}-${dia}`);

        // Soma duração da garantia em meses
        const meses = parseInt(nota.duracaoGarantia);
        const dataExp = new Date(dataCompra);
        dataExp.setMonth(dataExp.getMonth() + meses);

        // Calcula dias restantes
        const diasRestantes =
          (dataExp.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);

        // Define tipo de notificação
        let tipo: Notificacao["tipo"] | "" = "";

        if (diasRestantes < 0) tipo = "Expirada";
        else if (diasRestantes <= 30) tipo = "Próxima de Expirar";

        // Ignora notas sem notificação
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
      // Remove notificações nulas (tipagem correta)
      .filter((item): item is Notificacao => item !== null);
  };

  // Estado das notificações
  const [notificacoesState, setNotificacoesState] =
    useState<Notificacao[]>(gerarNotificacoes());

  // Marca uma notificação como lida/não lida
  const marcarComoLida = (index: number) => {
    setNotificacoesState((prev) =>
      prev.map((n, i) => (i === index ? { ...n, lida: !n.lida } : n))
    );
  };

  // Marca todas as notificações como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoesState((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  // Filtra notas com base na busca
  const notasFiltradas = notasFiscais.filter((nota) =>
    nota.produto.toLowerCase().includes(busca.toLowerCase())
  );

  // Função para sair da conta
  const handleSair = () => {
    Swal.fire({
      title: "Deseja realmente sair da sua conta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#6b21a8",
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

        <button className="btn-sair" onClick={handleSair}>
          Sair
        </button>
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

            {notificacoesState.some((n) => !n.lida) && (
              <span className="notificacao-alerta"></span>
            )}
          </div>
        </div>
      </section>

      <div className="container-notas">
        {notasFiltradas.map((nota, index) => (
          <Nota key={index} {...nota} />
        ))}
      </div>

      {modalNotificacoes && (
        <div
          className="modal-overlay"
          onClick={() => setModalNotificacoes(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-fechar"
              onClick={() => setModalNotificacoes(false)}
            >
              ×
            </button>

            <h2 className="modal-titulo">Notificações</h2>
            <p className="modal-subtitulo">
              Notas próximas de expirar ou expiradas
            </p>

            <button
              className="btn-marcar-todas"
              onClick={marcarTodasComoLidas}
            >
              <AiOutlineCheckCircle /> Marcar todas
            </button>

            <div className="info-modal">
              {notificacoesState.length === 0 && (
                <p>Nenhuma notificação</p>
              )}

              {notificacoesState.map((nota, index) => (
                <div
                  key={index}
                  className={`item-notificacao ${
                    nota.lida ? "lida" : "nao-lida"
                  }`}
                >
                  <div>
                    <p>
                      <strong>{nota.produto}</strong> –{" "}
                      <span
                        className={`tipo-notificacao ${
                          nota.tipo === "Expirada"
                            ? "expirada"
                            : "proxima"
                        }`}
                      >
                        {nota.tipo}
                      </span>
                    </p>

                    <p className="info-nota">
                      Compra: {nota.dataCompra} | Garantia:{" "}
                      {nota.duracaoGarantia} meses
                    </p>
                  </div>

                  <button
                    className="btn-lida"
                    onClick={() => marcarComoLida(index)}
                  >
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
