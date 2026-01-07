import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
import "../style/CadastroNota.css";
import "../style/Notas.css";
import "../style/esqueceu-senha.css";

interface NotaProps {
  id?: string;
  tipoNota: string;
  produto: string;
  loja: string;
  dataCompra: string;
  duracaoGarantia: string;
  numeroNota: string;
  valor: string;
  garantiaEstendida: string;
  tempoGarantiaEstendida?: string;
  observacoes: string;
  arquivo?: string | null;
}

const CadastroNota: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const modoEdicao = location.state?.modoEdicao || false;
  const notaEdicao = location.state?.nota;

  const [formData, setFormData] = useState({
    tipoNota: modoEdicao ? notaEdicao?.tipoNota || "" : "",
    produto: notaEdicao?.produto || "",
    loja: notaEdicao?.loja || "",
    dataCompra: notaEdicao?.dataCompra || "",
    duracaoGarantia: modoEdicao ? notaEdicao?.duracaoGarantia?.toString() || "" : "",
    numeroNota: notaEdicao?.numeroNota || "",
    valor: notaEdicao?.valor || "",
    garantiaEstendida: notaEdicao?.garantiaEstendida || "Não",
    tempoGarantiaEstendida: notaEdicao?.tempoGarantiaEstendida || ""
  });

  const [observacoes, setObservacoes] = useState(notaEdicao?.observacoes || "");
  const [arquivo, setArquivo] = useState<string | null>(notaEdicao?.arquivo || null);
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatarData = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length > 8) return numeros.slice(0, 8);

    let formatted = numeros;
    if (formatted.length > 2) formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
    if (formatted.length > 5) formatted = formatted.slice(0, 5) + "/" + formatted.slice(5);

    return formatted;
  };

  const formatarValor = (valor: string) => {
    const numeros = valor.replace(/\D/g, "");
    if (!numeros) return "";
    const numero = parseInt(numeros, 10);
    return (numero / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let valorFinal = value;

    if (name === "dataCompra") valorFinal = formatarData(value);
    else if (name === "valor") valorFinal = formatarValor(value);

    setFormData(prev => ({ ...prev, [name]: valorFinal }));
    setErros(prev => ({ ...prev, [name]: "" }));
  };

  const handleObservacoesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservacoes(e.target.value);
  };

  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setArquivo(reader.result as string);
      reader.readAsDataURL(file);
    }
    setErros(prev => ({ ...prev, arquivo: "" }));
  };

  const removerArquivo = () => setArquivo(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novosErros: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "tempoGarantiaEstendida") {
        novosErros[key] = "Campo obrigatório";
      }
    });

    if (formData.garantiaEstendida === "Sim" && !formData.tempoGarantiaEstendida) {
      novosErros["tempoGarantiaEstendida"] = "Campo obrigatório";
    }

    if (!arquivo) novosErros["arquivo"] = "Campo obrigatório";

    if (formData.dataCompra) {
      const partes = formData.dataCompra.split("/");
      if (partes.length !== 3 || partes[2].length !== 4) {
        novosErros["dataCompra"] = "Ano deve ter 4 dígitos";
      }
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setShowConfirmModal(true);
  };

  const confirmarSalvar = () => {
    setShowConfirmModal(false);

    const novaNota: NotaProps = {
      id: modoEdicao ? notaEdicao.id : crypto.randomUUID(),
      ...formData,
      observacoes,
      arquivo
    };

    const usuario = localStorage.getItem("usuarioLogado");
    const usuarioLogado = usuario ? JSON.parse(usuario) : null;

    const storageKey = usuarioLogado?.email
      ? `notas_${usuarioLogado.email}`
      : "notas";

    const notasExistentes = localStorage.getItem(storageKey);
    let notasArray: NotaProps[] = notasExistentes ? JSON.parse(notasExistentes) : [];

    if (modoEdicao) {
      notasArray = notasArray.map(n =>
        n.id === notaEdicao.id ? novaNota : n
      );
    } else {
      notasArray = [novaNota, ...notasArray];
    }

    localStorage.setItem(storageKey, JSON.stringify(notasArray));

    setShowSuccessModal(true);
  };

  const fecharConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const fecharSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/notas");
  };

  const renderLabel = (label: string, campo: string) => (
    <label>
      {label} {campo !== "observacoes" && <span className="obrigatorio">*</span>}
    </label>
  );

  const erroClass = (campo: string) => erros[campo] ? "input-erro" : "";

  return (
    <main className="pagina">
      <section className="cartao">
        <Link to="/notas" className="voltar"><AiOutlineArrowLeft /> Voltar</Link>

        <div className="cabecalho">
          <div>
            <h1 className="titulo">
              {modoEdicao ? "Editar Nota Fiscal" : "Cadastro de Nota Fiscal"}
            </h1>
            <p className="subtitulo">
              Preencha os dados da nota fiscal e produto
            </p>
          </div>
        </div>

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo tipo-nota">
            {renderLabel("Tipo de Garantia", "tipoNota")}
            <select
              name="tipoNota"
              value={formData.tipoNota}
              onChange={handleChange}
              className={erroClass("tipoNota")}
            >
              {!modoEdicao && <option value="">Selecione o tipo de garantia</option>}
              <option>Nota Fiscal Física</option>
              <option>Nota Fiscal Digital</option>
            </select>
            {erros.tipoNota && <span className="erro-texto">{erros.tipoNota}</span>}
          </div>

          <div className="campo duracaoGarantia">
            {renderLabel("Período de Garantia", "duracaoGarantia")}
            <select
              name="duracaoGarantia"
              value={formData.duracaoGarantia}
              onChange={handleChange}
              className={erroClass("duracaoGarantia")}
            >
              {!modoEdicao && <option value="">Selecione o tempo</option>}
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
            </select>
            {erros.duracaoGarantia && <span className="erro-texto">{erros.duracaoGarantia}</span>}
          </div>

          <div className="campo produto">
            {renderLabel("Nome do Produto", "produto")}
            <input
              name="produto"
              type="text"
              value={formData.produto}
              onChange={handleChange}
              placeholder="Ex: Notebook Lenovo IdeaPad"
              className={erroClass("produto")}
            />
            {erros.produto && <span className="erro-texto">{erros.produto}</span>}
          </div>

          <div className="campo loja">
            {renderLabel("Nome da Loja", "loja")}
            <input
              name="loja"
              type="text"
              value={formData.loja}
              onChange={handleChange}
              placeholder="Ex: FastShop"
              className={erroClass("loja")}
            />
            {erros.loja && <span className="erro-texto">{erros.loja}</span>}
          </div>

          <div className="campo dataCompra">
            {renderLabel("Data de Compra", "dataCompra")}
            <input
              name="dataCompra"
              type="text"
              value={formData.dataCompra}
              onChange={handleChange}
              placeholder="Ex: 15/12/2024"
              className={erroClass("dataCompra")}
            />
            {erros.dataCompra && <span className="erro-texto">{erros.dataCompra}</span>}
          </div>

          <div className="campo garantiaEstendida">
            {renderLabel("Garantia Estendida", "garantiaEstendida")}
            <select
              name="garantiaEstendida"
              value={formData.garantiaEstendida}
              onChange={handleChange}
              className={erroClass("garantiaEstendida")}
            >
              <option>Não</option>
              <option>Sim</option>
            </select>
            {erros.garantiaEstendida && <span className="erro-texto">{erros.garantiaEstendida}</span>}
          </div>

          {formData.garantiaEstendida === 'Sim' && (
            <div className="campo tempoGarantiaEstendida">
              {renderLabel("Tempo Garantia Estendida (meses)", "tempoGarantiaEstendida")}
              <select
                name="tempoGarantiaEstendida"
                value={formData.tempoGarantiaEstendida}
                onChange={handleChange}
                className={erroClass("tempoGarantiaEstendida")}
              >
                <option value="">Selecione o tempo</option>
                <option value="3">3 meses</option>
                {Number(formData.duracaoGarantia) >= 6 && <option value="6">6 meses</option>}
                {Number(formData.duracaoGarantia) >= 12 && <option value="12">12 meses</option>}
                {Number(formData.duracaoGarantia) >= 24 && <option value="24">24 meses</option>}
              </select>
              {erros.tempoGarantiaEstendida && <span className="erro-texto">{erros.tempoGarantiaEstendida}</span>}
            </div>
          )}

          <div className="campo numeroNota">
            {renderLabel("Número da Nota Fiscal", "numeroNota")}
            <input
              name="numeroNota"
              type="text"
              value={formData.numeroNota}
              onChange={handleChange}
              placeholder="Ex: NF-2024-001234"
              className={erroClass("numeroNota")}
            />
            {erros.numeroNota && <span className="erro-texto">{erros.numeroNota}</span>}
          </div>

          <div className="campo valor">
            {renderLabel("Valor", "valor")}
            <input
              name="valor"
              type="text"
              value={formData.valor}
              onChange={handleChange}
              placeholder="Ex: R$ 3.299,00"
              className={erroClass("valor")}
            />
            {erros.valor && <span className="erro-texto">{erros.valor}</span>}
          </div>

          <div className="campo observacoes">
            {renderLabel("Observações", "observacoes")}
            <textarea
              name="observacoes"
              value={observacoes}
              onChange={handleObservacoesChange}
              placeholder="Informações adicionais sobre a garantia."
            />
          </div>

          <div className="campo anexar-nota">
            {renderLabel("Anexar Nota", "arquivo")}
            {arquivo ? (
              <div className="preview-arquivo">
                <span className="preview-documento">Documento carregado</span>
                <a href={arquivo} target="_blank" rel="noreferrer" className="preview-abrir">Abrir</a>
                <span className="preview-remover" onClick={removerArquivo} title="Remover arquivo">×</span>
              </div>
            ) : (
              <div className="linha-arquivo">
                <span className="texto-upload">Selecione um documento</span>
                <input
                  type="file"
                  id="arquivo"
                  className={`input-arquivo ${erros.arquivo ? "input-erro" : ""}`}
                  onChange={handleArquivoChange}
                />
                <label htmlFor="arquivo" className="button small purple">Anexar Nota</label>
                {erros.arquivo && <span className="erro-texto">{erros.arquivo}</span>}
              </div>
            )}
          </div>

          <div className="acoes-formulario">
            <button type="submit" className="button purple">
              {modoEdicao ? "Atualizar Nota Fiscal" : "Salvar Nota Fiscal"}
            </button>
            <Link to="/notas">
              <button type="button" className="button outline">Cancelar</button>
            </Link>
          </div>
        </form>
      </section>

      {showConfirmModal && (
        <div className="modal-overlay" onClick={fecharConfirmModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="btn-fechar" onClick={fecharConfirmModal}>
              ×
            </button>

            <h2 className="modal-titulo">Confirme os dados da nota</h2>

            <div className="modal-subtitulo resumo-nota">
              <p><strong>Tipo de Garantia:</strong> {formData.tipoNota || "-"}</p>
              <p><strong>Produto:</strong> {formData.produto}</p>
              <p><strong>Loja:</strong> {formData.loja}</p>
              <p><strong>Data de Compra:</strong> {formData.dataCompra}</p>
              <p><strong>Período da Garantia:</strong> {formData.duracaoGarantia ? formData.duracaoGarantia + ' meses' : '-'}</p>
              <p><strong>Garantia Estendida:</strong> {formData.garantiaEstendida}</p>
              {formData.garantiaEstendida === "Sim" && (
                <p><strong>Tempo Garantia Estendida:</strong> {formData.tempoGarantiaEstendida} meses</p>
              )}
              <p><strong>Número da Nota:</strong> {formData.numeroNota}</p>
              <p><strong>Valor:</strong> {formData.valor}</p>
              <p><strong>Observações:</strong> {observacoes || "-"}</p>
            </div>

            <div className="modal-botoes">
              <button
                className="btn-cadastrar-modal"
                onClick={confirmarSalvar}
              >
                Confirmar
              </button>

              <button className="btn-cancelar-modal" onClick={fecharConfirmModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay" onClick={fecharSuccessModal}>
          <div
            className="modal-content success"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="btn-fechar" onClick={fecharSuccessModal}>
              ×
            </button>

            <h2 className="modal-titulo">{modoEdicao ? "Nota Atualizada!" : "Nota cadastrada!"}</h2>
            <p className="modal-subtitulo">
              Sua nota fiscal foi {modoEdicao ? "atualizada" : "cadastrada"} com sucesso.
            </p>

            <button className="btn-ok-modal" onClick={fecharSuccessModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CadastroNota;