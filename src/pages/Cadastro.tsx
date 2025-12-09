import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Cadastro.css";

const Cadastro: React.FC = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroCpf, setErroCpf] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");

  const [modalSucesso, setModalSucesso] = useState(false);

  const validar = () => {
    let valido = true;

    if (!nome.trim()) {
      setErroNome("Por favor, preencha o nome completo.");
      valido = false;
    } else setErroNome("");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim()) {
      setErroEmail("Por favor, preencha o e-mail.");
      valido = false;
    } else if (!emailRegex.test(email)) {
      setErroEmail("Digite um e-mail válido (ex: exemplo@gmail.com).");
      valido = false;
    } else setErroEmail("");

    if (!cpf.trim()) {
      setErroCpf("Por favor, preencha o CPF.");
      valido = false;
    } else if (cpf.replace(/\D/g, "").length !== 11) {
      setErroCpf("CPF deve conter 11 números.");
      valido = false;
    } else setErroCpf("");

    if (!telefone.trim()) {
      setErroTelefone("Por favor, preencha o telefone.");
      valido = false;
    } else if (telefone.replace(/\D/g, "").length < 10) {
      setErroTelefone("Digite um telefone válido.");
      valido = false;
    } else setErroTelefone("");

    if (!senha.trim()) {
      setErroSenha("Por favor, preencha a senha.");
      valido = false;
    } else if (senha.length < 9) {
      setErroSenha("A senha deve ter no mínimo 9 caracteres.");
      valido = false;
    } else setErroSenha("");

    if (!confirmarSenha.trim()) {
      setErroConfirmarSenha("Confirme sua senha.");
      valido = false;
    } else if (senha !== confirmarSenha) {
      setErroConfirmarSenha("As senhas não coincidem.");
      valido = false;
    } else setErroConfirmarSenha("");

    return valido;
  };

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      setModalSucesso(true);
    }
  };

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

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {erroSenha && <span className="erro-texto">{erroSenha}</span>}

            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            {erroConfirmarSenha && (
              <span className="erro-texto">{erroConfirmarSenha}</span>
            )}

            <button type="submit">Criar conta</button>
          </form>

          <div className="links">
            <Link to="/">Já tem conta? Fazer login</Link>
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
