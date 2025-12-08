import React from 'react';
import { Link } from 'react-router-dom';
import "../style/CadastroNota.css";

const CadastroNota: React.FC = () => {
  return (
    <>
      <main className="pagina">
        <section className="cartao">

          <Link to="/notas" className="voltar">← Voltar</Link>

          <div className="cabecalho">
            <div className="icone">📄</div>
            <div>
              <h1 className="titulo">Cadastro de Nota Fiscal</h1>
              <p className="subtitulo">Preencha os dados da nota fiscal e produto</p>
            </div>
          </div>

          <form className="formulario">

            <div className="campo">
              <label>Tipo de Nota Fiscal</label>
              <select>
                <option>Nota Fiscal Física</option>
                <option>Nota Fiscal Digital</option>
              </select>
            </div>

            <div className="campo">
              <label>Nome do Produto</label>
              <input type="text" placeholder="Ex: Notebook Lenovo IdeaPad" />
            </div>

            <div className="campo">
              <label>Nome da Loja</label>
              <input type="text" placeholder="Ex: FastShop" />
            </div>

            <div className="campo">
              <label>Data de Compra</label>
              <input type="text" placeholder="Ex: 15/12/25" />
            </div>

            <div className="campo">
              <label>Período de Garantia</label>
              <select>
                <option>3 meses</option>
                <option>6 meses</option>
                <option>1 ano</option>
                <option>2 anos</option>
              </select>
            </div>

            <div className="campo">
              <label>Número da Nota Fiscal</label>
              <input type="text" placeholder="Ex: NF-2024-001234" />
            </div>

            <div className="campo">
              <label>Valor</label>
              <input type="text" placeholder="Ex: R$ 3.299,00" />
            </div>

            <div className="campo">
              <label>Observações</label>
              <textarea placeholder="Informações adicionais sobre a garantia."></textarea>
            </div>

            <div className="campo">
              <label>Anexar Nota</label>

              <div className="linha-arquivo">
                <span className="texto-upload">Selecione um documento</span>

                <input type="file" id="arquivo" className="input-arquivo" />
                <label htmlFor="arquivo" className="button small purple">
                  Anexar Nota
                </label>
              </div>
            </div>

            <button type="submit" className="button purple">
              Salvar Nota Fiscal
            </button>

            <Link to="/notas">
              <button type="button" className="button outline">
                Cancelar
              </button>
            </Link>

          </form>

        </section>
      </main>
    </>
  );
};

export default CadastroNota;