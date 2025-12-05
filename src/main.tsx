import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login.tsx'
import Cadastro from './components/Cadastro.tsx'
import CadastroNota from './components/CadastroNota.tsx'
import './style/CadastroNota.css'
import EsqueceuSenha from './components/EsqueceuSenha.tsx'
import './style/Login.css'
import './style/esqueceu-senha.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-nota" element={<CadastroNota />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
