import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Cadastro.css';

const Cadastro: React.FC = () => {
    return (
        <div className="cadastro-container">

            <div className="side-image-cadastro"></div>

            <div className="cadastro-right">
                <div className="cadastro-card">
                    <h2>Cadastre-se</h2>
                    <p>Preencha seus dados abaixo</p>

                    <form>
                        <input type="text" placeholder="Nome completo" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="CPF" />
                        <input type="tel" placeholder="Telefone" />
                        <input type="password" placeholder="Senha" />
                        <input type="password" placeholder="Confirmar senha" />

                        <button type="submit">Criar conta</button>
                    </form>

                    <div className="links">
                        <Link to="/">Já tem conta? Fazer login</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cadastro;
