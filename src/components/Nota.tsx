// Hook de estado
import { useState } from "react";
// Navegação entre rotas
import { useNavigate } from "react-router-dom";
// Estilos do componente
import "../style/Nota.css";
// Ícones
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";

// Define quais dados a Nota recebe
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
  arquivo?: string | null;
}

// Componente principal
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
  observacoes,
  arquivo,
}: NotaProps) => {

  // Controle de abertura do modal de detalhes
  const [modalAberto, setModalAberto] = useState(false);
  // Permite navegar entre páginas
  const navigate = useNavigate();

  // Redireciona para o cadastro em modo edição
  const editarNota = () => {
    navigate("/cadastro-nota", {
      state: {
        modoEdicao: true,
        nota: {
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
        },
      },
    });
  };

  return (
    <>
      <div className="cartao-nota">
        <section className="cabecalho-nota">
          <div className="icone-nota">
            <IoShieldCheckmarkOutline />
          </div>

          <article className="info-principal-nota">
            <h2 className="titulo-nota">{produto}</h2>
            <p className="sub-nota">{descricao}</p>

            <p className="data-garantia">
              <CiCalendarDate />
              {dataCompra} | Garantia: {duracaoGarantia}
            </p>
          </article>

          <div
            className={`status-badge ${
              statusGarantia === "Expirada"
                ? "status-expirada"
                : "status-ativa"
            }`}
          >
            {statusGarantia}
          </div>
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
        <div
          className="modal-overlay"
          onClick={() => setModalAberto(false)}
        >
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
              <p><strong>Período de Garantia:</strong> {duracaoGarantia}</p>
              <p><strong>Número da Nota Fiscal:</strong> {numeroNota}</p>
              <p><strong>Valor:</strong> {valor}</p>
              <p><strong>Observações:</strong> {observacoes}</p>

              {arquivo && (
                <p className="arquivo-anexo">
                  <strong>Arquivo Anexado:</strong>

                  {arquivo.startsWith("data:image") ? (
                    <img
                      src={arquivo}
                      alt="Nota Fiscal"
                      className="imagem-nota"
                    />
                  ) : (
                    <a
                      href={arquivo}
                      target="_blank"
                      rel="noreferrer"
                      className="link-arquivo"
                    >
                      {arquivo.endsWith(".pdf")
                        ? "📄 Abrir PDF"
                        : "🖼️ Abrir Imagem"}
                    </a>
                  )}
                </p>
              )}
            </div>

            <button
              className="btn-editar"
              onClick={editarNota}
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nota;
