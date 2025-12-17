import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Cadastro.css";
import olhoAberto from "../assets/olho-aberto.png";
import olhoFechado from "../assets/olho-fechado.png";

const Cadastro: React.FC = () => {
  const navigate = useNavigate();

  // Estados dos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Estados de erro
  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroCpf, setErroCpf] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");
  const [erroTermos, setErroTermos] = useState("");

  // Checkbox termos
  const [aceitouTermos, setAceitouTermos] = useState(false);

  // Mostrar/ocultar senha
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Modal
  const [modalSucesso, setModalSucesso] = useState(false);

  // Mock inicial
  useEffect(() => {
    if (!localStorage.getItem("usuarios")) {
      localStorage.setItem(
        "usuarios",
        JSON.stringify([
          {
            nome: "Usuário Teste",
            email: "user@gmail.com",
            cpf: "12345678901",
            telefone: "81988887777",
            senha: "123456789"
          }
        ])
      );
    }
  }, []);

  const toggleSenha = () => setMostrarSenha(!mostrarSenha);

  // Funções para limpar erro ao focar
  const limparErro = (setErro: React.Dispatch<React.SetStateAction<string>>) => {
    setErro("");
  };

  // Validação
  const validar = () => {
    let valido = true;
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Nome
    if (!nome.trim()) {
      setErroNome("Por favor, preencha o nome completo.");
      valido = false;
    }

    // Email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim()) {
      setErroEmail("Por favor, preencha o e-mail.");
      valido = false;
    } else if (!emailRegex.test(email)) {
      setErroEmail("Digite um e-mail válido.");
      valido = false;
    } else if (usuarios.some((u: any) => u.email === email.toLowerCase())) {
      setErroEmail("Este e-mail já está cadastrado.");
      valido = false;
    }

    // CPF
    const cpfLimpo = cpf.replace(/\D/g, "");
    if (!cpf.trim()) {
      setErroCpf("Por favor, preencha o CPF.");
      valido = false;
    } else if (cpfLimpo.length !== 11) {
      setErroCpf("CPF deve conter 11 números.");
      valido = false;
    } else if (usuarios.some((u: any) => u.cpf === cpfLimpo)) {
      setErroCpf("Este CPF já está cadastrado.");
      valido = false;
    }

    // Telefone
    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (!telefone.trim()) {
      setErroTelefone("Por favor, preencha o telefone.");
      valido = false;
    } else if (telefoneLimpo.length < 10) {
      setErroTelefone("Digite um telefone válido.");
      valido = false;
    } else if (usuarios.some((u: any) => u.telefone === telefoneLimpo)) {
      setErroTelefone("Este telefone já está cadastrado.");
      valido = false;
    }

    // Senha
    if (!senha.trim()) {
      setErroSenha("Por favor, preencha a senha.");
      valido = false;
    } else if (senha.length < 9) {
      setErroSenha("A senha deve ter no mínimo 9 caracteres.");
      valido = false;
    }

    // Confirmar senha
    if (!confirmarSenha.trim()) {
      setErroConfirmarSenha("Confirme sua senha.");
      valido = false;
    } else if (senha !== confirmarSenha) {
      setErroConfirmarSenha("As senhas não coincidem.");
      valido = false;
    }

    // Termos
    if (!aceitouTermos) {
      setErroTermos("Você precisa aceitar os termos para continuar.");
      valido = false;
    }

    return valido;
  };

  // Submit
  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    usuarios.push({
      nome,
      email: email.toLowerCase(),
      cpf: cpf.replace(/\D/g, ""),
      telefone: telefone.replace(/\D/g, ""),
      senha
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    setModalSucesso(true);
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
              onFocus={() => limparErro(setErroNome)}
            />
            {erroNome && <span className="erro-texto">{erroNome}</span>}

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => limparErro(setErroEmail)}
            />
            {erroEmail && <span className="erro-texto">{erroEmail}</span>}

            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              onFocus={() => limparErro(setErroCpf)}
            />
            {erroCpf && <span className="erro-texto">{erroCpf}</span>}

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              onFocus={() => limparErro(setErroTelefone)}
            />
            {erroTelefone && <span className="erro-texto">{erroTelefone}</span>}

            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onFocus={() => limparErro(setErroSenha)}
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
                onFocus={() => limparErro(setErroConfirmarSenha)}
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

            <div className="termos">
              <div className="termos-aceite">
                <input
                  type="checkbox"
                  checked={aceitouTermos}
                  onChange={(e) => {
                    setAceitouTermos(e.target.checked);
                    setErroTermos("");
                  }}
                />
                <label>
                  Eu li e concordo com os{" "}
                  <a href="./public/termos/termos.html" target="_blank">
                    Termos e Condições de Uso
                  </a>{" "}
                  e com a{" "}
                  <a href="./public/termos/politica.html" target="_blank">
                    Política de Privacidade
                  </a>.
                </label>
              </div>
              {erroTermos && <span className="erro-texto">{erroTermos}</span>}
            </div>

            <button type="submit" className="criarConta">
              Criar conta
            </button>

            <div className="links">
              <Link to="/">Já tem conta? Fazer login</Link>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL */}
      {modalSucesso && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="btn-fechar" onClick={fecharModal}>
              ×
            </button>

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
