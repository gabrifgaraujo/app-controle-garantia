import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Login.css";
import olhoAberto from "../assets/olho-aberto.png";
import olhoFechado from "../assets/olho-fechado.png";

interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleSenha = () => setMostrarSenha(!mostrarSenha);

  const limparErro = () => {
    if (erro) setErro("");
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Por favor, digite um endereço de email válido.");
      return;
    }

    const usuarios: Usuario[] = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email.toLowerCase() && u.senha === senha
    );

    if (!usuarioEncontrado) {
      setErro("Usuário não cadastrado ou senha incorreta.");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    setErro("");
    navigate("/notas");
  };

  return (
    <div className="page-container">
      <div className="side-image-login"></div>

      <div className="form-container">
        <div className="form-card">
          <h2>Sistema de Controle de Garantia</h2>
          <p>Entre com suas credenciais para acessar</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={limparErro}
            />

            <div className="campo-senha">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onFocus={limparErro}
              />

              <img
                src={mostrarSenha ? olhoAberto : olhoFechado}
                alt="mostrar senha"
                onClick={toggleSenha}
                className="icone-senha"
              />
            </div>

            {erro && <span className="erro-texto">{erro}</span>}

            <button type="submit" className="botao-login">
              Entrar
            </button>
          </form>

          <div className="links">
            <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
            <Link
              to="/notas"
              onClick={() => {
                const visitante = {
                  nome: "Visitante",
                  email: "visitante@local",
                  senha: ""
                };

                localStorage.setItem("usuarioLogado", JSON.stringify(visitante));
              }}
            >
              Entrar como visitante
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;