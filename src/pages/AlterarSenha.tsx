import { useState } from "react";
import MenuLateral from "../components/MenuLateral";
import Swal from "sweetalert2";
import "../style/AlterarSenha.css";

interface UsuarioProps {
  senha: string;
  nome: string;
  email: string;
  avatar?: string | null;
}

export default function AlterarSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erroAtual, setErroAtual] = useState("");
  const [erroNova, setErroNova] = useState("");
  const [erroConfirm, setErroConfirm] = useState("");

  const usuario = localStorage.getItem("usuarioLogado");
  const usuarioLogado: UsuarioProps = usuario
    ? JSON.parse(usuario)
    : { nome: "", email: "", senha: "" };

  const validarCampos = () => {
    let valido = true;

    if (!senhaAtual.trim()) {
      setErroAtual("Senha atual é obrigatória.");
      valido = false;
    } else if (senhaAtual !== usuarioLogado.senha) {
      setErroAtual("Senha atual incorreta.");
      valido = false;
    }

    if (!novaSenha.trim()) {
      setErroNova("Nova senha é obrigatória.");
      valido = false;
    } else if (novaSenha.length < 6) {
      setErroNova("A nova senha deve ter pelo menos 6 caracteres.");
      valido = false;
    }

    if (!confirmSenha.trim()) {
      setErroConfirm("Confirmação da senha é obrigatória.");
      valido = false;
    } else if (novaSenha !== confirmSenha) {
      setErroConfirm("As senhas não coincidem.");
      valido = false;
    }

    return valido;
  };

  const handleSalvar = () => {
    if (!validarCampos()) return;

    const usuarioAtualizado = { ...usuarioLogado, senha: novaSenha };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const index = usuarios.findIndex((u: any) => u.email === usuarioLogado.email);
    if (index !== -1) {
      usuarios[index].senha = novaSenha;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    Swal.fire({
      icon: "success",
      title: "Senha alterada com sucesso!",
      timer: 2000,
      showConfirmButton: false,
    });

    setSenhaAtual("");
    setNovaSenha("");
    setConfirmSenha("");
    setErroAtual("");
    setErroNova("");
    setErroConfirm("");
  };

  return (
    <MenuLateral
      currentPage="Alterar Senha"
      nome={usuarioLogado.nome}
      email={usuarioLogado.email}
      avatar={usuarioLogado.avatar}
    >
      <div className="alterar-senha-container">
        <div className="alterar-senha-card">
          <h2 className="alterar-senha-title">Alterar Senha</h2>

          <div className="alterar-senha-grid">
            <div className="info-field">
              <label className="field-label">Senha Atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                onFocus={() => setErroAtual("")}
                className="field-input"
                placeholder="Digite sua senha atual"
              />
              {erroAtual && <p className="error-text">{erroAtual}</p>}
            </div>

            <div className="info-field">
              <label className="field-label">Nova Senha</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                onFocus={() => setErroNova("")}
                className="field-input"
                placeholder="Digite a nova senha"
              />
              {erroNova && <p className="error-text">{erroNova}</p>}
            </div>

            <div className="info-field">
              <label className="field-label">Confirmar Nova Senha</label>
              <input
                type="password"
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
                onFocus={() => setErroConfirm("")}
                className="field-input"
                placeholder="Confirme a nova senha"
              />
              {erroConfirm && <p className="error-text">{erroConfirm}</p>}
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleSalvar} className="save-button">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </MenuLateral>
  );
}
