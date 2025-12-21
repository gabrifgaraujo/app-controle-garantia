import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

// pages
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import CadastroNota from './components/CadastroNota'
import EsqueceuSenha from './components/EsqueceuSenha'
import Notas from './pages/Notas'

// floating dark mode button
import ThemeToggle from './components/ThemeToggle'
import './style/Theme.css'

// page styles
import './style/Cadastro.css'
import './style/CadastroNota.css'
import './style/Login.css'
import './style/esqueceu-senha.css'
import './style/Nota.css'
import './style/Notas.css'

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.body.classList.add('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      
      {/* floating button visible on all pages */}
      <ThemeToggle />

      {/* app routes */}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-nota" element={<CadastroNota />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
        <Route path="/notas" element={<Notas />} />
      </Routes>

    </HashRouter>
  </StrictMode>
)
