//React e hook
import React, { useState } from "react";
//Navegação entre rotas
import { Link, useNavigate } from "react-router-dom";
//Estilos de página
import "../style/Login.css";
//Ícones/imagens para mostrar/ocultar senha
import olhoAberto from "../assets/olho-aberto.png";
import olhoFechado from "../assets/olho-fechado.png";

//Define estrutura do usuário
interface Usuario {
  email: string;
  senha: string;
}

//Usuários cadastrados (exemplo estático)
const usuariosCadastrados: Usuario[] = [
  { email: "user@gmail.com", senha: "123456789" },
];

//Página de login
const Login: React.FC = () => {
  /*
  Controle de navegação
  Redireciona o usuário após o login bem-sucedido
  */
  const navigate = useNavigate();

  //Estados do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  //Estado de erro geral
  const [erro, setErro] = useState("");

  //Controla a visibilidade da senha
  const [mostrarSenha, setMostrarSenha] = useState(false);

  //Função para validar o formato do email
  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  //Função para alternar mostrar/ocultar senha
  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  //Função de submissão do formulário
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    //Campos obrigatórios
    if (!email || !senha) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    //Email inválido
    if (!validarEmail(email)) {
      setErro("Por favor, digite um endereço de email válido.");
      return;
    }

    //Verifica se o usuário existe
    const usuarioEncontrado = usuariosCadastrados.find(
      (u) => u.email === email && u.senha === senha
    );

    //Usuário não encontrado
    if (!usuarioEncontrado) {
      setErro("Usuário não cadastrado ou senha incorreta.");
      return;
    }

    //Login bem-sucedido
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

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            {}
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full border rounded px-3 py-2 pr-10"
              />

              <img
                src={mostrarSenha ? olhoAberto : olhoFechado}
                alt="Mostrar senha"
                onClick={toggleSenha}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              />
            </div>

            {erro && (
              <span className="text-red-500 text-sm">{erro}</span>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Entrar
            </button>
          </form>

          <div className="links">
            <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
