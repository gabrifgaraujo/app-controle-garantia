import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Login.css";
import olhoAberto from "../assets/olho-aberto.png";
import olhoFechado from "../assets/olho-fechado.png";

// user structure
interface Usuario {
  email: string;
  senha: string;
}

// fake users
const usuariosCadastrados: Usuario[] = [
  { email: "user@gmail.com", senha: "123456789" },
];

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const limparErro = () => {
    if (erro) setErro("");
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

    const usuarioEncontrado = usuariosCadastrados.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuarioEncontrado) {
      setErro("Usuário não cadastrado ou senha incorreta.");
      return;
    }

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
            <Link to="/notas">Entrar como visitante</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
