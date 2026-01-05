import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/aponti_marca_horizontal.png";
import {
  FileText,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Check,
  CheckCheck,
  Key,
} from "lucide-react";
import "../style/MenuLateral.css";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  nome: string;
  email: string;
  avatar?: string | null;
}

type Notificacao = {
  produto: string;
  dataCompra: string;
  duracaoGarantia: string;
  tipo: "Expirada" | "Próxima de Expirar";
  lida: boolean;
};

export default function MenuLateral({
  children,
  currentPage = "Início",
  nome,
  email,
  avatar,
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) return;

    const usuarioLogado = JSON.parse(usuario);
    const storageKey = `notas_${usuarioLogado.email}`;

    const notasSalvas = localStorage.getItem(storageKey);
    if (!notasSalvas) {
      setNotificacoes([]);
      return;
    }

    const listaNotas = JSON.parse(notasSalvas);
    const hoje = new Date();

    const novasNotificacoes = listaNotas
      .map((nota: any) => {
        if (!nota.dataCompra || !nota.duracaoGarantia) return null;

        const [dia, mes, ano] = nota.dataCompra.split("/");
        if (!dia || !mes || !ano) return null;

        const dataCompraObj = new Date(`${ano}-${mes}-${dia}`);
        const meses = parseInt(nota.duracaoGarantia, 10);

        if (isNaN(meses)) return null;

        const dataExp = new Date(dataCompraObj);
        dataExp.setMonth(dataExp.getMonth() + meses);

        const diasRestantes =
          (dataExp.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);

        let tipo: Notificacao["tipo"] | null = null;

        if (diasRestantes < 0) tipo = "Expirada";
        else if (diasRestantes <= 30) tipo = "Próxima de Expirar";

        if (!tipo) return null;

        return {
          produto: nota.produto,
          dataCompra: nota.dataCompra,
          duracaoGarantia: nota.duracaoGarantia,
          tipo,
          lida: false,
        };
      })
      .filter(Boolean);

    setNotificacoes(novasNotificacoes);
  }, []);

  const marcarComoLida = (index: number) => {
    setNotificacoes((prev) =>
      prev.map((n, i) => (i === index ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  const navigateTo = (page: string) => {
    const map: { [key: string]: string } = {
      Perfil: "/perfil",
      Início: "/notas",
      "Visualizar Notas": "/notas",
      "Alterar Senha": "/alterar-senha",
    };
    navigate(map[page] || "/notas");
    setIsSidebarOpen(false);
  };

  return (
    <div className="layout-container">
      <button
        className="mobile-menu-button"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="menu-icon" />
      </button>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <button
          className="close-sidebar-button"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X />
        </button>

        <div className="user-section" onClick={() => navigateTo("Perfil")}>
          <div className="user-avatar">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="avatar-image" />
            ) : (
              nome
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
            )}
          </div>
          <div className="user-info">
            <h3>{nome}</h3>
            <p>{email}</p>
          </div>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${
              currentPage === "Visualizar Notas" ? "nav-item-active" : ""
            }`}
            onClick={() => navigateTo("Visualizar Notas")}
          >
            <FileText />
            <span>Visualizar Notas</span>
          </button>

          <button
            className="nav-item"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell />
            <span>Notificações</span>
            {notificacoes.some((n) => !n.lida) && (
              <span className="notification-badge">
                {notificacoes.filter((n) => !n.lida).length}
              </span>
            )}
          </button>

          <button
            className={`nav-item ${
              currentPage === "Perfil" ? "nav-item-active" : ""
            }`}
            onClick={() => navigateTo("Perfil")}
          >
            <User />
            <span>Meu Perfil</span>
          </button>

          <button
            className={`nav-item ${
              currentPage === "Alterar Senha" ? "nav-item-active" : ""
            }`}
            onClick={() => navigateTo("Alterar Senha")}
          >
            <Key />
            <span>Alterar Senha</span>
          </button>
        </nav>
        <div
          style={{
            padding: "12px",
            borderBottom: "1px solid var(--border-default)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          
          <ThemeToggle />
        </div>

        <div className="sidebar-footer">
          <button
            className="nav-item nav-item-logout"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <LogOut />
            <span>Sair</span>
          </button>

          <div className="sidebar-logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </aside>

      <main className="main-content">{children}</main>

      {isNotificationsOpen && (
        <>
          <div
            className="notification-overlay"
            onClick={() => setIsNotificationsOpen(false)}
          />
          <div className="notification-popup">
            <div className="notification-header">
              <h3>Notificações</h3>
              <div className="notification-actions">
                <button onClick={marcarTodasComoLidas}>
                  <CheckCheck size={18} />
                </button>
                <button onClick={() => setIsNotificationsOpen(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="notification-list">
              {notificacoes.map((n, index) => (
                <div
                  key={index}
                  className={`
                                        notification-item
                                        ${
                                          n.tipo === "Expirada"
                                            ? "notification-expirada"
                                            : "notification-proxima"
                                        }
                                        ${n.lida ? "notification-lida" : ""}
                                    `}
                >
                  <div>
                    <strong>{n.produto}</strong>
                    <p>{n.tipo}</p>
                    <small>
                      Compra: {n.dataCompra} • Garantia: {n.duracaoGarantia}{" "}
                      meses
                    </small>
                  </div>

                  {!n.lida && (
                    <button
                      className="mark-read-icon"
                      onClick={() => marcarComoLida(index)}
                    >
                      <Check size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isLogoutModalOpen && (
        <>
          <div
            className="logout-overlay"
            onClick={() => setIsLogoutModalOpen(false)}
          />

          <div className="logout-modal">
            <h3>Deseja sair?</h3>
            <p>Você precisará entrar novamente para acessar sua conta.</p>

            <div className="logout-actions">
              <button
                className="logout-cancel"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancelar
              </button>

              <button className="logout-confirm" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
