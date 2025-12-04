import React from "react";
import { Link } from "react-router-dom";
import "../style/Login.css";

const Login: React.FC = () => {
  return (
    <div className="page-container">

      <div className="side-image-login"></div>

      <div className="form-container">
        <div className="form-card">
          <h2>Sistema de Controle de Garantia</h2>
          <p>Entre com suas credenciais para acessar</p>

          <form>
            <input type="email" placeholder="seu@email.com" />
            <input type="password" placeholder="••••••••" />
            <button type="submit">Entrar</button>
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