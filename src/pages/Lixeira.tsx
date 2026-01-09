import { useState, useEffect } from "react";
import MenuLateral from "../components/MenuLateral";
import type { NotaProps } from "../components/Nota";
import "../style/Lixeira.css";
import {
    AiOutlineFileText,
    AiOutlineDelete,
    AiOutlineUndo,
} from "react-icons/ai";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import Swal from "sweetalert2";

const Lixeira = () => {
    const [notasDeletadas, setNotasDeletadas] = useState<NotaProps[]>([]);
    const [usuarioLogado, setUsuarioLogado] = useState({
        nome: "",
        email: "",
        avatar: null as string | null,
    });

    useEffect(() => {
        const usuario = localStorage.getItem("usuarioLogado");
        if (usuario) setUsuarioLogado(JSON.parse(usuario));
    }, []);

    useEffect(() => {
        const usuario = localStorage.getItem("usuarioLogado");
        if (!usuario) return;

        const { email } = JSON.parse(usuario);
        const chaveLixeira = `lixeira_${email}`;

        const lixeiraSalva = localStorage.getItem(chaveLixeira);
        if (lixeiraSalva) {
            setNotasDeletadas(JSON.parse(lixeiraSalva));
        }
    }, []);

    const restaurarNota = (id: string) => {
        const usuario = localStorage.getItem("usuarioLogado");
        if (!usuario) return;

        const { email } = JSON.parse(usuario);
        const chaveNotas = `notas_${email}`;
        const chaveLixeira = `lixeira_${email}`;

        const notaParaRestaurar = notasDeletadas.find((nota) => nota.id === id);
        if (!notaParaRestaurar) return;

        const notasAtuais = JSON.parse(localStorage.getItem(chaveNotas) || "[]");
        notasAtuais.push(notaParaRestaurar);
        localStorage.setItem(chaveNotas, JSON.stringify(notasAtuais));

        const novaLixeira = notasDeletadas.filter((nota) => nota.id !== id);
        localStorage.setItem(chaveLixeira, JSON.stringify(novaLixeira));
        setNotasDeletadas(novaLixeira);

        const isDark = document.body.classList.contains("dark");
        Swal.fire({
            icon: "success",
            title: "Nota restaurada!",
            confirmButtonText: "OK",
            background: isDark ? "#141414" : "#ffffff",
            color: isDark ? "#e5e7eb" : "#1f2937",
            confirmButtonColor: "#7c3aed",
        });
    };

    const limparLixeira = () => {
        const isDark = document.body.classList.contains("dark");

        Swal.fire({
            title: "Limpar lixeira?",
            text: "Todas as notas serão permanentemente excluídas.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Limpar",
            cancelButtonText: "Cancelar",
            background: isDark ? "#141414" : "#ffffff",
            color: isDark ? "#e5e7eb" : "#1f2937",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: isDark ? "#374151" : "#9ca3af",
        }).then((result) => {
            if (result.isConfirmed) {
                const usuario = localStorage.getItem("usuarioLogado");
                if (!usuario) return;

                const { email } = JSON.parse(usuario);
                const chaveLixeira = `lixeira_${email}`;

                localStorage.removeItem(chaveLixeira);
                setNotasDeletadas([]);

                Swal.fire({
                    icon: "success",
                    title: "Lixeira limpa!",
                    confirmButtonText: "OK",
                    background: isDark ? "#141414" : "#ffffff",
                    color: isDark ? "#e5e7eb" : "#1f2937",
                    confirmButtonColor: "#7c3aed",
                });
            }
        });
    };

    return (
        <MenuLateral
            currentPage="Lixeira"
            nome={usuarioLogado.nome}
            email={usuarioLogado.email}
            avatar={usuarioLogado.avatar}
        >
            <div className="lixeira-pagina">
                <header className="lixeira-cabecalho">
                    <div className="cabecalho-texto">
                        <h1>Lixeira</h1>
                        <p>Notas fiscais que foram excluídas</p>
                    </div>

                    {notasDeletadas.length > 0 && (
                        <button className="btn-limpar-lixeira" onClick={limparLixeira}>
                            <AiOutlineDelete />
                            Limpar Lixeira
                        </button>
                    )}
                </header>

                <div className="lixeira-container">
                    {notasDeletadas.length === 0 ? (
                        <div className="lixeira-vazia">
                            <div className="icone-vazio">
                                <AiOutlineFileText />
                            </div>
                            <p>Lixeira vazia</p>
                            <span>Nenhuma nota foi excluída</span>
                        </div>
                    ) : (
                        notasDeletadas.map((nota) => (
                            <div key={nota.id} className="cartao-nota-lixeira">
                                <section className="cabecalho-nota">
                                    <div className="cabecalho-topo">
                                        <div className="icone-nota">
                                            <IoShieldCheckmarkOutline />
                                        </div>
                                    </div>

                                    <article className="info-principal-nota">
                                        <h2 className="titulo-nota">{nota.produto}</h2>
                                        <p className="sub-nota">{nota.descricao}</p>

                                        <p className="data-garantia">
                                            <CiCalendarDate />
                                            {nota.dataCompra} | Garantia: {nota.duracaoGarantia}{" "}
                                            meses
                                        </p>
                                    </article>
                                </section>

                                <div className="acoes-nota-lixeira">
                                    <button
                                        className="btn-restaurar"
                                        onClick={() => restaurarNota(nota.id)}
                                    >
                                        <AiOutlineUndo />
                                        Restaurar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </MenuLateral>
    );
};

export default Lixeira;