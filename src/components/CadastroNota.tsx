//React e hook de estado
import React, { useState } from 'react';
//Ferramentas de navegação do React Router
import { Link, useLocation, useNavigate } from 'react-router-dom';
//Biblioteca para modais e alertas
import Swal from 'sweetalert2';
//Estilos CSS específicos para este componente
import "../style/CadastroNota.css";

const CadastroNota: React.FC = () => {
  //Recupera informações da localização atual e função de navegação
  const location = useLocation();
  //Permite navegação programática entre rotas
  const navigate = useNavigate();
  //Verifica se está em modo de edição e obtém os dados da nota, se disponíveis
  const modoEdicao = location.state?.modoEdicao || false;
  //Dados da nota para edição, se houver
  const nota = location.state?.nota;

  //Dados principais da nota fiscal
  const [formData, setFormData] = useState({
    tipoNota: nota?.tipoNota || "Nota Fiscal Digital",
    produto: nota?.produto || "",
    loja: nota?.loja || "",
    dataCompra: nota?.dataCompra || "",
    duracaoGarantia: nota?.duracaoGarantia || "3 meses",
    numeroNota: nota?.numeroNota || "",
    valor: nota?.valor || "",
    garantiaEstendida: nota?.garantiaEstendida || "Não"
  });

  //Observações adicionais
  const [observacoes, setObservacoes] = useState(nota?.observacoes || "");
  //Arquivo anexado (imagem ou documento)
  const [arquivo, setArquivo] = useState<string | null>(nota?.arquivo || null);
  //Erros de validação do formulário
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  //Atualiza campos de input/select
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //limpa o erro do campo ao digitar
    setErros({ ...erros, [e.target.name]: "" });
  };

  //Atualiza campo de observações
  const handleObservacoesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservacoes(e.target.value);
  };

  //Lida com o update de arquivo
  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      //Converte o arquivo para Base64 para facilitar o preview
      reader.onloadend = () => setArquivo(reader.result as string);
      reader.readAsDataURL(file);
    }
    //limpa o erro do campo ao selecionar um arquivo
    setErros({ ...erros, arquivo: "" });
  };
  //Remove o arquivo anexado
  const removerArquivo = () => setArquivo(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let novosErros: { [key: string]: string } = {};

    //Validação dos campos obrigatórios
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) novosErros[key] = "Campo obrigatório";
    });
    if (!arquivo) novosErros["arquivo"] = "Campo obrigatório";

    setErros(novosErros);
    //Se houver erros, não prossegue
    if (Object.keys(novosErros).length > 0) return;

    const resumoHtml = `
      <div style="text-align:left">
        <p><strong>Tipo de Nota:</strong> ${formData.tipoNota}</p>
        <p><strong>Produto:</strong> ${formData.produto}</p>
        <p><strong>Loja:</strong> ${formData.loja}</p>
        <p><strong>Data de Compra:</strong> ${formData.dataCompra}</p>
        <p><strong>Duração da Garantia:</strong> ${formData.duracaoGarantia}</p>
        <p><strong>Garantia Estendida:</strong> ${formData.garantiaEstendida}</p>
        <p><strong>Número da Nota:</strong> ${formData.numeroNota}</p>
        <p><strong>Valor:</strong> ${formData.valor}</p>
        <p><strong>Observações:</strong> ${observacoes || "-"}</p>
        <p><strong>Arquivo:</strong> ${arquivo ? `<a href="${arquivo}" target="_blank" style="color:#7428f4; text-decoration:underline;">Abrir</a>` : "Não selecionado"}</p>
      </div>
    `;

    //Modal de confirmação dos dados
    const result = await Swal.fire({
      title: "Confirme os dados da nota",
      html: resumoHtml,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#7a2ff5",
      cancelButtonColor: "#f44336",
      width: 500,
    });

    //Se confirmado, mostra mensagem de sucesso e navega de volta para a lista de notas
    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: modoEdicao ? "Nota Fiscal Atualizada!" : "Nota Fiscal cadastrada!",
        confirmButtonColor: "#7a2ff5"
      });
      navigate("/notas");
    }
  };

  //Renderiza o label com asterisco para campos obrigatórios
  const renderLabel = (label: string, campo: string) => (
    <label>
      {label} {campo !== "observacoes" && <span style={{ color: "#f44336" }}>*</span>}
    </label>
  );

  //Retorna a classe de erro se o campo tiver erro
  const erroClass = (campo: string) => erros[campo] ? "input-erro" : "";

  return (
    <main className="pagina">
      <section className="cartao">
        <Link to="/notas" className="voltar">← Voltar</Link>

        <div className="cabecalho">
          <div className="icone">📄</div>
          <div>
            <h1 className="titulo">{modoEdicao ? "Editar Nota Fiscal" : "Cadastro de Nota Fiscal"}</h1>
            <p className="subtitulo">Preencha os dados da nota fiscal e produto</p>
          </div>
        </div>

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo">
            {renderLabel("Tipo de Nota Fiscal", "tipoNota")}
            <select
              name="tipoNota"
              value={formData.tipoNota}
              onChange={handleChange}
              className={erroClass("tipoNota")}
            >
              <option>Nota Fiscal Física</option>
              <option>Nota Fiscal Digital</option>
            </select>
            {erros.tipoNota && <span className="erro-texto">{erros.tipoNota}</span>}
          </div>

          <div className="campo">
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

          <div className="campo">
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

          <div className="campo">
            {renderLabel("Data de Compra", "dataCompra")}
            <input
              name="dataCompra"
              type="text"
              value={formData.dataCompra}
              onChange={handleChange}
              placeholder="Ex: 15/12/25"
              className={erroClass("dataCompra")}
            />
            {erros.dataCompra && <span className="erro-texto">{erros.dataCompra}</span>}
          </div>

          <div className="campo">
            {renderLabel("Período de Garantia", "duracaoGarantia")}
            <select
              name="duracaoGarantia"
              value={formData.duracaoGarantia}
              onChange={handleChange}
              className={erroClass("duracaoGarantia")}
            >
              <option>3 meses</option>
              <option>6 meses</option>
              <option>1 ano</option>
              <option>2 anos</option>
            </select>
            {erros.duracaoGarantia && <span className="erro-texto">{erros.duracaoGarantia}</span>}
          </div>

          <div className="campo">
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

          <div className="campo">
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

          <div className="campo">
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

          <div className="campo">
            {renderLabel("Observações", "observacoes")}
            <textarea
              name="observacoes"
              value={observacoes}
              onChange={handleObservacoesChange}
              placeholder="Informações adicionais sobre a garantia."
            ></textarea>
          </div>

          <div className="campo">
            {renderLabel("Anexar Nota", "arquivo")}

            {arquivo ? (
              <div className="preview-arquivo" style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                {arquivo.startsWith("data:image") ? (
                  <img
                    src={arquivo}
                    alt="Preview"
                    style={{ width: "100px", height: "auto", borderRadius: "8px", border: "1px solid #ccc" }}
                  />
                ) : (
                  <span
                    style={{
                      padding: "6px 12px",
                      background: "#eee",
                      borderRadius: "6px",
                      fontWeight: "bold"
                    }}
                  >
                    Documento carregado
                  </span>
                )}
                <a
                  href={arquivo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "6px 12px",
                    background: "#7428f4",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "bold"
                  }}
                >
                  Abrir
                </a>
                <span
                  style={{ cursor: "pointer", color: "#f44336", fontWeight: "bold", fontSize: "18px" }}
                  onClick={removerArquivo}
                  title="Remover arquivo"
                >
                  ×
                </span>
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

          <button type="submit" className="button purple">
            {modoEdicao ? "Atualizar Nota Fiscal" : "Salvar Nota Fiscal"}
          </button>

          <Link to="/notas">
            <button type="button" className="button outline">Cancelar</button>
          </Link>
        </form>
      </section>
    </main>
  );
};

export default CadastroNota;
