import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Nota.css";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

export interface NotaProps {
  id: string;
  produto: string;
  descricao: string;
  dataCompra: string;
  duracaoGarantia: string;
  statusGarantia: string;
  tipoNota: string;
  loja: string;
  numeroNota: string;
  valor: string;
  observacoes: string;
  arquivo?: string | null;
  garantiaEstendida?: string;
  tempoGarantiaEstendida?: string;
  onDelete: (id: string) => void;
}

const Nota = ({
  id,
  produto,
  descricao,
  dataCompra,
  duracaoGarantia,
  statusGarantia,
  tipoNota,
  loja,
  numeroNota,
  valor,
  observacoes,
  arquivo,
  garantiaEstendida,
  tempoGarantiaEstendida,
  onDelete,
}: NotaProps) => {
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  const editarNota = () => {
    navigate("/cadastro-nota", {
      state: {
        modoEdicao: true,
        nota: {
          id,
          produto,
          descricao,
          dataCompra,
          duracaoGarantia,
          statusGarantia,
          tipoNota,
          loja,
          numeroNota,
          valor,
          observacoes,
          arquivo,
          garantiaEstendida,
          tempoGarantiaEstendida,
        },
      },
    });
  };

  const deletarNota = () => {
    setModalAberto(false);
    onDelete(id);
  };

  const renderArquivo = () => {
    if (!arquivo) return null;
    return (
      <a
        href={arquivo}
        target="_blank"
        rel="noreferrer"
        className="link-arquivo"
      >
        Abrir Arquivo
      </a>
    );
  };

  const getStatusClass = () => {
    if (statusGarantia === "Expirada") return "status-expirada";
    if (statusGarantia === "A Expirar") return "status-proxima";
    return "status-ativa";
  };

  return (
    <>
      <div className="cartao-nota">
        <section className="cabecalho-nota">
          <div className="cabecalho-topo">
            <div className="icone-nota">
              <IoShieldCheckmarkOutline />
            </div>

            <div className={`status-badge ${getStatusClass()}`}>
              {statusGarantia}
            </div>
          </div>

          <article className="info-principal-nota">
            <h2 className="titulo-nota">{produto}</h2>
            <p className="sub-nota">{descricao}</p>

            <p className="data-garantia">
              <CiCalendarDate />
              {dataCompra} | Garantia: {duracaoGarantia} meses
            </p>
          </article>
        </section>

        <div className="acoes-nota">
          <button
            className="btn-ver-mais-discreto"
            onClick={() => setModalAberto(true)}
          >
            Ver Mais
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-fechar"
              onClick={() => setModalAberto(false)}
            >
              ×
            </button>

            <h2 className="modal-titulo">{produto}</h2>
            <p className="modal-subtitulo">{descricao}</p>

            <div className="info-modal">
              <p><strong>Tipo de Garantia:</strong> {tipoNota}</p>
              <p><strong>Nome do Produto:</strong> {produto}</p>
              <p><strong>Nome da Loja:</strong> {loja}</p>
              <p><strong>Data de Compra:</strong> {dataCompra}</p>
              <p><strong>Período de Garantia:</strong> {duracaoGarantia} meses</p>

              {garantiaEstendida && (
                <p><strong>Garantia Estendida:</strong> {garantiaEstendida}</p>
              )}

              {garantiaEstendida === "Sim" && tempoGarantiaEstendida && (
                <p>
                  <strong>Tempo Garantia Estendida:</strong>{" "}
                  {tempoGarantiaEstendida} meses
                </p>
              )}

              <p><strong>Número da Nota Fiscal:</strong> {numeroNota}</p>
              <p><strong>Valor:</strong> {valor}</p>
              <p><strong>Observações:</strong> {observacoes || "-"}</p>

              {arquivo && (
                <p className="arquivo-anexo">
                  <strong>Arquivo Anexado:</strong> {renderArquivo()}
                </p>
              )}
            </div>

            <div className="acoes-modal">
              <button className="btn-editar" onClick={editarNota}>
                Editar
              </button>
              <button className="btn-deletar" onClick={deletarNota}>
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nota;