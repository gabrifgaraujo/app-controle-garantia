import React from 'react'
import { Link } from 'react-router-dom'
import "../style/esqueceu-senha.css";

const EsqueceuSenha: React.FC = () => {
    return ( 
        <>
        <div className="senha-container">
            <div className="side-image-senha"></div>
            <div className="senha-right">
                <div className="senha-card">
                <h2 className='mt-10'>Esqueceu a senha?</h2>
                <p>Digite abaixo o email cadastrado na sua conta</p>

                <form>   
                    <input type="email" placeholder='seu@email.com'/>
                    
                    <button type="submit">Enviar</button>
                </form>       

                    <div className="links">
                        <Link to="/">Já tem conta? Fazer login</Link>
                    </div>
                </div>
                </div>
            </div>

            </>
     );
}
 
export default EsqueceuSenha;