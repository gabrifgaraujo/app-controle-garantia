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



const Notas = ({ produto, descricao, dataCompra, duracaoGarantia, statusGarantia }: NotaProps ) => {
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

          <button className="btn btn-primary ml-auto">{statusGarantia}</button>
          <button className="btn btn-outline">{statusGarantia}</button>
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
