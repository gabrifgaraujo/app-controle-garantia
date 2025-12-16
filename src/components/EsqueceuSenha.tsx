//React e hook de estado
import React, { useState } from "react";
//Navegação entre rotas
import { Link, useNavigate } from "react-router-dom";
//Estilos específicos do componente
import "../style/esqueceu-senha.css";

const EsqueceuSenha: React.FC = () => {
  //Permite redirecionar o usuário via código
  const navigate = useNavigate();

  /*
  Usuário ficticio para simular a verificação do email.
  Em uma aplicação real, essa verificação seria feita via API.
  */
  const usuarioMockado = {
    email: "user@gmail.com",
  };

  //Email digitado pelo usuário
  const [email, setEmail] = useState("");
  //Mensagem de erro do campo email
  const [erroEmail, setErroEmail] = useState("");

  //Controle de modais
  const [modalErro, setModalErro] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);

  const validar = () => {
    let valido = true;

    //Validação do email
    if (!email.trim()) {
      setErroEmail("Por favor, preencha o e-mail.");
      valido = false;
    } else {

      //Regex simples para validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErroEmail("Digite um e-mail válido.");
        valido = false;
      } else {

        //Limpa erro se estiver válido
        setErroEmail("");
      }
    }

    return valido;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Interrompe se a validação falhar
    if (!validar()) return;

    //Verifica se o email existe (simulado)
    if (email !== usuarioMockado.email) {
      setModalErro(true);
    } else {
      setModalSucesso(true);
    }
  };

  //Fecha modal de erro
  const fecharModalErro = () => {
    setModalErro(false);
  };

  //Fecha modal de sucesso e redireciona para o login
  const fecharModalSucesso = () => {
    setModalSucesso(false);
    navigate("/");
  };

  return (
    <div className="senha-container">
      <div className="side-image-senha"></div>

      <div className="senha-right">
        <div className="senha-card">
          <h2 className="mt-10">Esqueceu a senha?</h2>
          <p>Digite abaixo o email cadastrado na sua conta</p>

          <form onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErroEmail("");
              }}
              onFocus={() => setErroEmail("")}
            />
            {erroEmail && <span className="erro-texto">{erroEmail}</span>}

            <button type="submit">Enviar</button>
          </form>

          <div className="links">
            <Link to="/">Voltar para o login.</Link>
          </div>
        </div>
      </div>

      {modalErro && (
        <div className="modal-overlay" onClick={fecharModalErro}>
          <div
            className="modal-content error"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="btn-fechar" onClick={fecharModalErro}>
              ×
            </button>

            <h2 className="modal-titulo">Email não cadastrado</h2>
            <p className="modal-subtitulo">
              Não encontramos nenhuma conta com este email.
            </p>

            <div className="modal-botoes">
              <button
                className="btn-cadastrar-modal"
                onClick={() => navigate("/cadastro")}
              >
                Cadastrar
              </button>

              <button className="btn-cancelar-modal" onClick={fecharModalErro}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {modalSucesso && (
        <div className="modal-overlay" onClick={fecharModalSucesso}>
          <div
            className="modal-content success"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="btn-fechar" onClick={fecharModalSucesso}>
              ×
            </button>

            <h2 className="modal-titulo">Email enviado!</h2>
            <p className="modal-subtitulo">
              Enviamos um link de redefinição para seu email.
            </p>

            <button className="btn-ok-modal" onClick={fecharModalSucesso}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EsqueceuSenha;