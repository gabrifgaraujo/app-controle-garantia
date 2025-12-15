//React e hook de estado
import React, { useState } from "react";
//Navegação entre rotas
import { Link, useNavigate } from "react-router-dom";
//Estilos de página
import "../style/Cadastro.css";
//Ícones/imagens para mostrar/ocultar senha
import olhoAberto from "../assets/olho-aberto.png";
import olhoFechado from "../assets/olho-fechado.png";

//Página de cadastro
const Cadastro: React.FC = () => {
  /*
  Controle de navegação
  Usado para redirecionar o usuário após o cadastro
  */
  const navigate = useNavigate();

  //Estados dos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  //Estados de erro por campo
  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroCpf, setErroCpf] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");

  //Estado do modal de sucesso
  const [modalSucesso, setModalSucesso] = useState(false);
  //Estado para mostrar/ocultar senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  //Função para alternar mostrar/ocultar senha
  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  //Função de validação dos campos
  const validar = () => {
    let valido = true;

    //Nome
    if (!nome.trim()) {
      setErroNome("Por favor, preencha o nome completo.");
      valido = false;
    } else setErroNome("");

    //Email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim()) {
      setErroEmail("Por favor, preencha o e-mail.");
      valido = false;
    } else if (!emailRegex.test(email)) {
      setErroEmail("Digite um e-mail válido (ex: exemplo@gmail.com).");
      valido = false;
    } else setErroEmail("");

    //CPF
    if (!cpf.trim()) {
      setErroCpf("Por favor, preencha o CPF.");
      valido = false;
    } else if (cpf.replace(/\D/g, "").length !== 11) {
      setErroCpf("CPF deve conter 11 números.");
      valido = false;
    } else setErroCpf("");

    //Telefone
    if (!telefone.trim()) {
      setErroTelefone("Por favor, preencha o telefone.");
      valido = false;
    } else if (telefone.replace(/\D/g, "").length < 10) {
      setErroTelefone("Digite um telefone válido.");
      valido = false;
    } else setErroTelefone("");

    //Senha
    if (!senha.trim()) {
      setErroSenha("Por favor, preencha a senha.");
      valido = false;
    } else if (senha.length < 9) {
      setErroSenha("A senha deve ter no mínimo 9 caracteres.");
      valido = false;
    } else setErroSenha("");

    //Confirmar senha
    if (!confirmarSenha.trim()) {
      setErroConfirmarSenha("Confirme sua senha.");
      valido = false;
    } else if (senha !== confirmarSenha) {
      setErroConfirmarSenha("As senhas não coincidem.");
      valido = false;
    } else setErroConfirmarSenha("");

    return valido;
  };

  //Submissão do formulário
  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      setModalSucesso(true);
    }
  };

  //Fechar modal
  const fecharModal = () => {
    setModalSucesso(false);
    navigate("/");
  };

  return (
    <div className="cadastro-container">
      <div className="side-image-cadastro"></div>

      <div className="cadastro-right">
        <div className="cadastro-card">
          <h2>Cadastre-se</h2>
          <p>Preencha seus dados abaixo</p>

          <form onSubmit={handleCadastro} noValidate>
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {erroNome && <span className="erro-texto">{erroNome}</span>}

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {erroEmail && <span className="erro-texto">{erroEmail}</span>}

            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            {erroCpf && <span className="erro-texto">{erroCpf}</span>}

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            {erroTelefone && <span className="erro-texto">{erroTelefone}</span>}

            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="pr-10"
              />
              <img
                src={mostrarSenha ? olhoAberto : olhoFechado}
                onClick={toggleSenha}
                className="olho-senha"
                alt="Mostrar senha"
              />
            </div>
            {erroSenha && <span className="erro-texto">{erroSenha}</span>}

            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="pr-10"
              />
              <img
                src={mostrarSenha ? olhoAberto : olhoFechado}
                onClick={toggleSenha}
                className="olho-senha"
                alt="Mostrar senha"
              />
            </div>
            {erroConfirmarSenha && (
              <span className="erro-texto">{erroConfirmarSenha}</span>
            )}

            <button type="submit">Criar conta</button>
          </form>

          <div className="links">
            <Link to="/">Já tem conta? Fazer login</Link>
          </div>

          <div className="termos">
            <p className="termos-texto">
              Ao clicar no botão, você declara que leu e aceitou nossos Termos e Condições de Uso e nossa Política de Privacidade.
            </p>

          <div className="termos-aceite">
            <input
              type="checkbox"
              id="aceite_termos"
              name="aceite_termos"
              required
            />

            <label htmlFor="aceite_termos">
              Eu li e concordo com os{" "}
              <a href="./public/termos/termos.html" target="_blank">Termos e Condições de Uso</a>{" "}
              e com a{" "}
              <a href="./public/termos/politica.html" target="_blank">Política de Privacidade</a>.
            </label>
          </div>
          <p className="LGPD-aviso">
            Seus dados serão tratados conforme a Lei Geral de Proteção de Dados (LGPD) para a prestação dos nossos serviços.
          </p>
        </div>
      </div>
      </div>

      {modalSucesso && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-fechar" onClick={fecharModal}>×</button>

            <h2 className="modal-titulo">Cadastro realizado!</h2>
            <p className="modal-subtitulo">
              Sua conta foi criada com sucesso.
            </p>

            <button className="btn-editar" onClick={fecharModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
