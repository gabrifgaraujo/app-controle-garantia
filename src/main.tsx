// src/main.tsx (com supressão para o erro de react-refresh)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { Suspense, useState, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'

import Splash from './components/Splash'

const Login = lazy(() => import('./pages/Login'))
const Cadastro = lazy(() => import('./pages/Cadastro'))
const CadastroNota = lazy(() => import('./components/CadastroNota'))
const EsqueceuSenha = lazy(() => import('./components/EsqueceuSenha'))
const Notas = lazy(() => import('./pages/Notas'))
const Perfil = lazy(() => import('./pages/Perfil'))
const Lixeira = lazy(() => import('./pages/Lixeira'))

// import ThemeToggle from './components/ThemeToggle'
import './style/Theme.css'
import './style/Cadastro.css'
import './style/CadastroNota.css'
import './style/Login.css'
import './style/esqueceu-senha.css'
import './style/Nota.css'
import './style/Notas.css'
import './style/Perfil.css'
import './style/Splash.css'
import './style/Spinner.css'

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.body.classList.add('dark')
}

// eslint-disable-next-line react-refresh/only-export-components
const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'white' }}>
        <div className="spinner"></div>
      </div>
    }>
      <HashRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-nota" element={<CadastroNota />} />
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/lixeira" element={<Lixeira />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)