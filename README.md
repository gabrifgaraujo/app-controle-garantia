# Aponti — Sistema de Controle de Garantia

O Aponti é o projeto integrador do curso de Frontend, desenvolvido para resolver o problema da má gestão de notas fiscais e certificados de garantia. O aplicativo tem como objetivo centralizar, organizar e emitir alertas sobre o prazo de validade das garantias de equipamentos adquiridos pelos usuários.

Este projeto está sendo desenvolvido em um ambiente ágil, com foco em aprendizado e boas práticas de desenvolvimento.

## DICA IMPORTANTÍSSIMA SOBRE O FLUXO DE TRABALHO NÃO PULE ISSO!
A partir de agora, seguiremos um fluxo de branches estruturado para evitar conflitos, perda de código e garantir organização. TODOS DEVEM SEGUIR À RISCA.
Regras do Novo Fluxo (GitFlow Simplificado)
  1. main = Produção: Contém apenas o código estável, testado e pronto. NINGUÉM faz push direto aqui.
  2. develop = Integração: É a branch principal de desenvolvimento. Todo o trabalho das features é integrado aqui primeiro.

# **Guia de Instalação, Configuração do Git e Fluxo Completo de Contribuição**
Leiam por favor eu imploro façam direitinho amo vocês

## 1. Instalando o Git
### **Windows**
1. Acesse: https://git-scm.com/downloads
2. Baixe o instalador de Windows.
3. Execute o arquivo `.exe`.
4. Mantenha as opções padrão.
5. Conclua a instalação.
### **Linux (Ubuntu/Debian)**
```bash
sudo apt update
sudo apt install git
```
### **MacOS**
```bash
brew install git
```
---
## 2. Configurando Git ( na hora que você instala antes de tudo você tem que configurar seu email e nome )
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"
```
---
## 3. Clonando o Repositório
```bash
git clone https://github.com/gabrifgaraujo/aponti-controle-garantia

```
depois você abre o vscode e seleciona a pasta onde está esse projeto que você clonou.

## 4. Seu fluxo de trabalho padrão
```bash
# serve pra puxar todas as alterações que provavelmente tem SEMPRE FAÇA GIT PULL ANTES DE QUALQUER COISA!!
git pull
# pra entrar na branch develop e mexer só nela, SO MEXA NELA POR FAVOR
git checkout develop
# primeiro passo pra lançar pro repositório suas alterações
git add .
git commit -m "(o tipo lá de commit): sua alteração"
# pra enviar todas as suas alterações :) 
git push origin develop

```
---
## 12. Regras OBRIGATÓRIAS!!
| Regra | Motivo |
|------|--------|
| Não comitarás em cima do código do teu irmão | Pecado Grave |
| Não enviarás código para a main | Sujeito á Chicotada |
| Não mexerás no mesmo código que teu irmão ao mesmo tempo | Burrice |
| Manterás teu vscode atualizado | Evita conflitos |
| Lembra-te de irritar Maria | Divertido |
---
## 13. SEU Checklist rápido (guarde em um bloquinho de notas)
- [ ] Atualizei dev
- [ ] Criei branch
- [ ] Commits feitos
- [ ] Push realizado
- [ ] PR aberto
- [ ] Branch deletada

## 3. Desenvolvimento e Commits

Cada novo commit faça desse jeitinho e tenha certeza de que seus **commits são descritivos** e seguem um padrão de mensagem [Conventional Commits](https://medium.com/linkapi-solutions/conventional-commits-pattern-3778d1a1e657).

## Visão Geral

O Aponti é um projeto frontend moderno, construído com:

*   **React**
*   **TypeScript**
*   **Vite** (versão atual)
*   **TailwindCSS**
*   **ESLint + Prettier**
*   **Estrutura para colaboração**: `.github`, `.vscode`, `.gitignore`, templates e scripts padronizados

O objetivo é garantir um fluxo de desenvolvimento limpo, organizado e pronto para contribuir.

## Início Rápido (Quick Start)

### 1. Pré-requisitos

Certifique-se de ter instalado:

*   Node.js 18+
*   Git
*   VSCode

### 2. Instalando o projeto

**Clone o repo:**

```bash
git clone https://github.com/gabrifgaraujo/aponti-controle-garantia
cd aponti-controle-garantia
```

**Instale as dependências:**

```bash
npm install
```

**Execute:**

```bash
npm run dev
```

**Acesse:**

O projeto estará disponível em `http://localhost:5173`.

## Tecnologias e Motivos

| Tecnologia | Uso |
| :--- | :--- |
| React | Interface do usuário |
| TypeScript | Tipagem estática e segurança |
| Vite | Build rápido e moderno |
| TailwindCSS | Estilização utilitária e produtiva |
| ESLint | Padronização e qualidade do código |
| Prettier | Formatação consistente |

## Arquivos e Pastas Criadas (explicação clara)

Aqui está o que existe no projeto e por quê:

### `.github/pull_request_template.md`

Template automático para qualquer Pull Request. Serve pra manter o histórico organizado e padronizado.

### `.vscode/settings.json`

Configura o VSCode pra formatar automaticamente ao salvar, usando o Prettier:

```json
"editor.formatOnSave": true
"editor.defaultFormatter": "esbenp.prettier-vscode"
```

Resultado: zero arquivos desformatados no repositório.

### `.gitignore`

Exclui arquivos que nunca devem ir para o Git:

```
node_modules/
dist/
.env
logs
```

Mantém o repo limpo e leve.

### `.prettierrc`

Configura a formatação global:

*   ponto e vírgula
*   aspas duplas
*   trailing comma
*   etc.

Deixa tudo consistente entre devs.

### `.eslintrc.json`

Criado automaticamente via:

```bash
npm init @eslint/config@latest
```

Inclui regras para:

*   TypeScript
*   React
*   Plugins do Prettier
*   Padrão atualizado do ESLint
*   Integração com importações modernas

Ele evita erros bobos e mantém o código limpo.

### `tsconfig.json`

Arquivo de configuração do TypeScript usando opções recomendadas pelo Vite moderno:

```json
"target": "ES2020"
"moduleResolution": "bundler"
"jsx": "react-jsx"
"strict": true
```

Garantindo tipagem forte e suporte aos recursos recentes do JS.

### `tailwind.config.js`

Criado com:

```bash
npx tailwindcss init -p
```

Inclui:

```javascript
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```

Necessário pra que o Tailwind remova classes não usadas no build.

### `postcss.config.js`

Usado pelo Vite para processar Tailwind + Autoprefixer.

## Estilos

No `src/index.css` foram adicionadas as diretivas:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Isso habilita todo o Tailwind na aplicação.

## Scripts do Projeto

Adicionados via `npm pkg set`:

| Script | Para que serve |
| :--- | :--- |
| `npm run dev` | Inicia o servidor Vite |
| `npm run build` | Gera build de produção |
| `npm run preview` | Previsualiza o build localmente |
| `npm run lint` | Verifica problemas com ESLint |
| `npm run format` | Formata todo o projeto com Prettier |

## Fluxo de Contribuição

A branch `main` é protegida. Toda alteração precisa:

**Criar branch:**

```bash
git checkout -b feat/nome-da-feature
```

**Comitar:**

```bash
git add .
git commit -m "feat: descrição da mudança"
```

**Enviar:**

```bash
git push origin feat/nome-da-feature
```

Abrir um Pull Request (PR) usando o template criado em `.github/`.

## Extensões Recomendadas no VSCode

*   ESLint
*   Prettier
*   Tailwind CSS IntelliSense
*   TypeScript Importer (opcional)

## Comandos úteis (resumo)

| Comando | Função |
| :--- | :--- |
| `npm run dev` | Roda o projeto |
| `npm run build` | Gera build |
| `npm run preview` | Testa build |
| `npm run lint` | Checa qualidade |
| `npm run format` | Formata tudo |
| `npm install` | Instala dependências |

## Conclusão

Esse README descreve todo o setup moderno utilizado:

*   Estrutura atual do Vite
*   Configuração do Tailwind oficial
*   ESLint + Prettier atualizados
*   Pastas automáticas (`.github`, `.vscode`)
*   Scripts saneados
*   Fluxo de contribuição profissional
