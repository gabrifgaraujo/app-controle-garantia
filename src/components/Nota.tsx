import "../style/Nota.css";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiShirt } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";

interface NotaProps {
  produto: string;
  descricao: string;
  dataCompra: string;
  duracaoGarantia: string;
  statusGarantia: string;
}

const Notas = ({ produto, descricao, dataCompra, duracaoGarantia, statusGarantia }: NotaProps) => {
  return (
    <div className="pagina-notas">
      <div className="cartao-nota">

        <section className="cabecalho-nota">
          <div className="icone-nota">
            <IoShieldCheckmarkOutline />
          </div>
          <article>
            <h2 className="titulo-nota">{produto}</h2>
            <p className="sub-nota">{descricao}.</p>
          </article>

          <div className="status-group">
            <button
              className={
                statusGarantia === "Ativa"
                  ? "btn btn-primary"
                  : "btn btn-outline"
              }
            >
              Ativa
            </button>

            <button
              className={
                statusGarantia === "Expirada"
                  ? "btn btn-primary"
                  : "btn btn-outline"
              }
            >
              Expirada
            </button>
          </div>

        </section>

        <section className="infos-nota">
          <div className="info-item">
            <i><CiCalendarDate />
            </i>
            <p>{dataCompra}</p>
            <i><CiShirt /></i>
            <p>Garantia: {duracaoGarantia}</p>
          </div>


        </section>

      </div>
    </div>
  );
};

export default Notas;
