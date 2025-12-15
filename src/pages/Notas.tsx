//Hooks do React
import { useState, useEffect } from "react";
//Navegação entre rotas
import { Link, useNavigate } from "react-router-dom";
//Alertas estilizados
import Swal from "sweetalert2";
//Componentes de nota fiscal
import Nota from "../components/Nota";
//Mock de notas fiscais
import notasFiscais from "../mock/notasFiscais";
//Estilos de página
import "../style/Notas.css";
//Ícones
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";

const Notas = () => {
  //Texto digitado na busca
  const [busca, setBusca] = useState("");
  //Controle do modal de notificações
  const [modalNotificacoes, setModalNotificacoes] = useState(false);
  //Controle de navegação
  const navigate = useNavigate();

  //Bloquear scroll com modal aberto
  useEffect(() => {
    document.body.style.overflow = modalNotificacoes ? "hidden" : "auto";
  }, [modalNotificacoes]);

  //Gera notificações com base nas notas fiscais
  const gerarNotificacoes = () => {
    //Data atual para comparação
    const hoje = new Date("2024-09-01");

    return notasFiscais
      .map((nota) => {
        //Converter dataCompra para objeto Date
        const [dia, mes, ano] = nota.dataCompra.split("/");
        const dataCompra = new Date(`${ano}-${mes}-${dia}`);

        //Soma duração da garantia em meses
        const meses = parseInt(nota.duracaoGarantia);
        const dataExp = new Date(dataCompra);
        dataExp.setMonth(dataExp.getMonth() + meses);

        //Calcula dias restantes
        const diasRestantes =
          (dataExp.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);

        //Define tipo de notificação
        let tipo: "Expirada" | "Próxima de Expirar" | "" = "";

        if (diasRestantes < 0) tipo = "Expirada";
        else if (diasRestantes <= 30) tipo = "Próxima de Expirar";
        //Ignora notas sem notificação
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
      //Remove notificações nulas
      .filter((item): item is NonNullable<typeof item> => item !== null);
  };

  //Estado das notificações
  const [notificacoesState, setNotificacoesState] = useState(
    gerarNotificacoes()
  );

  //Marca uma notificação como lida/não lida
  const marcarComoLida = (index: number) => {
    setNotificacoesState((prev) =>
      prev.map((n, i) => (i === index ? { ...n, lida: !n.lida } : n))
    );
  };

  //Marca todas as notificações como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoesState((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  //Filtra notas com base na busca
  const notasFiltradas = notasFiscais.filter(
    (nota) =>
      nota.produto.toLowerCase().includes(busca.toLowerCase()) ||
      nota.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  //Função para sair da conta
  const handleSair = () => {
    Swal.fire({
      title: 'Deseja realmente sair da sua conta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#6b21a8',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/');
      }
    });
  };

  return (
    <div className="pagina-lista">
      <header className="topo-notas">
        <h1 className="logo-app">Controle de Garantias</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button className="btn-sair" onClick={handleSair}>
            ← Sair
          </button>
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

          <input
            type="text"
            placeholder="Buscar nota..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <div style={{ position: "relative" }}>
            <button
              style={{
                background: "transparent",
                border: "none",
                fontSize: "26px",
                cursor: "pointer",
                color: "#7428f4",
              }}
              onClick={() => setModalNotificacoes(true)}
            >
              <IoNotificationsOutline />
            </button>

            {notificacoesState.some((n) => !n.lida) && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "10px",
                  height: "10px",
                  background: "red",
                  borderRadius: "50%",
                }}
              ></span>
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
          style={{ overflow: "hidden" }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "70vh", overflowY: "auto" }}
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
              onClick={marcarTodasComoLidas}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#7a2ff5",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "12px",
              }}
            >
              <AiOutlineCheckCircle /> Marcar todas
            </button>

            <div className="info-modal">
              {notificacoesState.length === 0 && <p>Nenhuma notificação</p>}

              {notificacoesState.map((nota, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    background: nota.lida ? "#f5f5f5" : "#dfd7f8",
                  }}
                >
                  <div>
                    <p>
                      <strong>{nota.produto}</strong> –{" "}
                      <span
                        style={{
                          color:
                            nota.tipo === "Expirada" ? "red" : "#f39c12",
                          fontWeight: "bold",
                        }}
                      >
                        {nota.tipo}
                      </span>
                    </p>

                    <p style={{ fontSize: "12px", color: "#555" }}>
                      Compra: {nota.dataCompra} | Garantia: {nota.duracaoGarantia} meses
                    </p>
                  </div>

                  <button
                    onClick={() => marcarComoLida(index)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: nota.lida ? "#2ecc71" : "#7a2ff5",
                    }}
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
