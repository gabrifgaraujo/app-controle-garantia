import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Nota.css";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

interface NotaProps {
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
}

const Nota = ({
  produto,
  descricao,
  dataCompra,
  duracaoGarantia,
  statusGarantia,
  tipoNota,
  loja,
  numeroNota,
  valor,
  observacoes
}: NotaProps) => {
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  const editarNota = () => {
    navigate("/cadastro-nota", { state: { modoEdicao: true, nota: {
      produto,
      descricao,
      dataCompra,
      duracaoGarantia,
      statusGarantia,
      tipoNota,
      loja,
      numeroNota,
      valor,
      observacoes
    } } });
  };

  return (
    <>
      <div className="cartao-nota">
        <section className="cabecalho-nota">
          <div className="icone-nota">
            <IoShieldCheckmarkOutline />
          </div>
          <article style={{ flex: 1 }}>
            <h2 className="titulo-nota">{produto}</h2>
            <p className="sub-nota">{descricao}</p>
            <p style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>
              <CiCalendarDate /> {dataCompra} | Garantia: {duracaoGarantia}
            </p>
          </article>

          <div className="status-group">
            <button className={statusGarantia === "Ativa" ? "btn btn-primary" : "btn btn-outline"}>
              Ativa
            </button>
            <button className={statusGarantia === "Expirada" ? "btn btn-primary" : "btn btn-outline"}>
              Expirada
            </button>
          </div>
        </section>

        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
          <button className="btn-ver-mais-discreto" onClick={() => setModalAberto(true)}>
            Ver Mais
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-fechar" onClick={() => setModalAberto(false)}>×</button>
            <h2 className="modal-titulo">{produto}</h2>
            <p className="modal-subtitulo">{descricao}</p>

            <div className="info-modal">
              <p><strong>Tipo de Nota Fiscal:</strong> {tipoNota}</p>
              <p><strong>Nome do Produto:</strong> {produto}</p>
              <p><strong>Nome da Loja:</strong> {loja}</p>
              <p><strong>Data de Compra:</strong> {dataCompra}</p>
              <p><strong>Período de Garantia:</strong> {duracaoGarantia}</p>
              <p><strong>Número da Nota Fiscal:</strong> {numeroNota}</p>
              <p><strong>Valor:</strong> {valor}</p>
              <p><strong>Observações:</strong> {observacoes}</p>
            </div>

            <button className="btn-editar" onClick={editarNota}>
              Editar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nota;
