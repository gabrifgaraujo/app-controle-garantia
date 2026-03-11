# Aponti — Sistema de Controle de Garantia

<div align="start">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</div>

O 'app-controle-garantia' é um aplicativo frontend desenvolvido como projeto integrador da trilha Frontend disponibilizado pela Aponti (Bolsa Futuro Digital. O sistema centraliza notas fiscais e certificados de garantia, organiza equipamentos adquiridos e emite alertas automáticos sobre prazos de validade, tudo em uma interface moderna e responsiva.

Tecnologias e Decisões de Arquitetura
Neste projeto, focamos em experiência do usuário, performance e manutenibilidade:

* React + TypeScript: Interface declarativa com tipagem forte, reduzindo erros em tempo de desenvolvimento e facilitando a escalabilidade.
* Vite: Ferramenta de build extremamente rápida, com hot module replacement (HMR) para desenvolvimento ágil.
* React Router DOM: Navegação SPA fluida e organizada entre múltiplas páginas sem recarregar a aplicação.
* Tailwind CSS: Estilização utilitária, responsiva e altamente produtiva, sem necessidade de CSS customizado excessivo.
* Lucide React + React Icons: Ícones leves, consistentes e otimizados para performance.
* SweetAlert2: Notificações e alertas elegantes e intuitivos para feedback ao usuário (cadastros, expirações, erros).
* ESLint (configuração flat) + Prettier: Padronização automática de código e qualidade garantida em todo o projeto.
* Deploy via GitHub Pages: Script automatizado (`gh-pages`) para publicação instantânea da versão de produção.

## Como Executar
Você pode rodar a aplicação de duas formas:

### Opção 1: Desenvolvimento Local (Recomendado)
Certifique-se de ter Node.js 18+ instalado. No terminal, na raiz do projeto:

```bash
# 1. Clonar o repositório
git clone https://github.com/gabrifgaraujo/app-controle-garantia.git

# 2. Entrar na pasta
cd app-controle-garantia

# 3. Instalar dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```
A aplicação estará disponível em http://localhost:5173

### Opção 2: Build de Produção

```bash
npm run build
npm run preview
```
Gera e pré-visualiza a versão otimizada para produção.

## Funcionalidades Principais

- Cadastro de Garantias
Formulário completo para inserir dados do equipamento, nota fiscal e data de validade.
Validações em tempo real e feedback visual via SweetAlert2.

- Lista e Organização
Visualização centralizada de todos os equipamentos cadastrados.
Ordenação, filtros e exibição clara dos prazos restantes.

- Alertas Automáticos
Notificações inteligentes sobre garantias próximas do vencimento.
Interface responsiva que funciona perfeitamente em desktop e mobile.

- Armazenamento Local Persistente
Dados salvos no navegador
