import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login.tsx'
import Cadastro from './pages/Cadastro.tsx'
import CadastroNota from './components/CadastroNota.tsx'
import EsqueceuSenha from './components/EsqueceuSenha.tsx'
import Notas from "./pages/Notas.tsx"

// Importação dos arquivos CSS
import './style/CadastroNota.css'
import './style/Login.css'
import './style/esqueceu-senha.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-nota" element={<CadastroNota />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
        <Route path="/notas" element={<Notas />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
