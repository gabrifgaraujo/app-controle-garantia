# Aponti — Sistema de Controle de Garantia

O Aponti é o projeto integrador do curso de Frontend, desenvolvido para resolver o problema da má gestão de notas fiscais e certificados de garantia. O aplicativo tem como objetivo centralizar, organizar e emitir alertas sobre o prazo de validade das garantias de equipamentos adquiridos pelos usuários.

Este projeto está sendo desenvolvido em um ambiente ágil, com foco em aprendizado e boas práticas de desenvolvimento.

## DICA IMPORTANTÍSSIMA SOBRE O FLUXO DE TRABALHO NÃO PULE ISSO!
A partir de agora, seguiremos um fluxo de branches estruturado para evitar conflitos, perda de código e garantir organização. TODOS DEVEM SEGUIR À RISCA.
Regras do Novo Fluxo (GitFlow Simplificado)
  1. main = Produção: Contém apenas o código estável, testado e pronto. NINGUÉM faz push direto aqui.
  2. dev = Integração: É a branch principal de desenvolvimento. Todo o trabalho das features é integrado aqui primeiro via Pull Request.
  3. feature-seunome = Trabalho Individual: Cada pessoa trabalha exclusivamente na sua própria branch.

# Fluxo de Trabalho Passo a Passo (Como Trabalhar)
---

## 1. Preparação: Sincronização com `dev`

**SEMPRE** comece seu trabalho a partir do branch `dev` mais atualizado.

```bash
# 1. Troca para o branch de desenvolvimento
git checkout dev

# 2. Puxa as últimas alterações do repositório remoto
git pull origin dev
```

## 2. Criação do Branch de Trabalho

Crie um novo branch para a sua tarefa (feature ou correção). O nome do branch **DEVE** seguir o padrão `feature-seunome` para fácil identificação.

```bash
# Cria e troca para o seu novo branch
git checkout -b feature-seunome

# Exemplos de nomes de branch:
# feature-mariane
# feature-joao
```

## 3. Desenvolvimento e Commits

Trabalhe normalmente no seu branch. Certifique-se de que seus **commits são descritivos** e seguem um padrão de mensagem [Conventional Commits](https://medium.com/linkapi-solutions/conventional-commits-pattern-3778d1a1e657).

```bash
# 1. Adiciona todas as alterações
git add .

# 2. Cria um commit descritivo
git commit -m "feat: adiciona formulário de login"
# Outros exemplos:
# fix: corrige erro de validação no campo X
# refactor: melhora a performance da função Y
```

## 4. Envio para o GitHub

Envie o seu branch local para o repositório remoto no GitHub.

```bash
# Envia o branch para o GitHub
git push origin feature-seunome
```

## 5. Abertura do Pull Request (PR)

Após o envio, **ABRA UM PULL REQUEST (PR) NO GITHUB** para iniciar o processo de revisão de código.

1.  **Acesse o Repositório:** Vá para a página do seu repositório no GitHub.
2.  **Novo PR:** Clique em "Pull Requests" > "New Pull Request".
3.  **Configuração:**
    *   **BASE:** `dev`
    *   **COMPARE:** `feature-seunome` (o seu branch)
4.  **Template:** Use o template de PR que aparece automaticamente.
5.  **Revisão:** Aguarde a revisão e aprovação do **Líder Técnico (Mariane)**.

> ⚠️ **ATENÇÃO:** **NUNCA** abra um PR diretamente para o branch `main`. O branch `dev` é o alvo de todas as features.

## 6. Pós-Merge (Limpeza)

Após o seu PR ser **APROVADO** e **MERGEADO** no branch `dev`:

1.  **Exclusão do Branch:** Sua branch `feature-seunome` pode ser deletada no GitHub (opcional, mas recomendado para manter a organização).
2.  **Próxima Tarefa:** Crie uma **nova branch** a partir do `dev` atualizado para a próxima tarefa.

## 7. Atualização da Versão de Produção

O branch `main` só será atualizado quando o `dev` estiver **estável e testado**.

*   Um PR será aberto da `dev` para a `main` para atualizar a "versão de produção".

---

# ❌ O QUE NÃO FAZER (Regras Inegociáveis)

| Ação Proibida | Descrição |
| :--- | :--- |
| ❌ **Trabalhar em `dev` ou `main`** | **NUNCA** faça commits diretamente nos branches `dev` ou `main`. |
| ❌ **Push Direto** | **NUNCA** faça `push` direto para `dev` ou `main`. A integração é **SEMPRE** via Pull Request. |
| ❌ **PR para `main`** | **NUNCA** abra PR de `feature-*` para `main`. O alvo é **SEMPRE** o branch `dev`. |
| ❌ **Branch Parado** | **NUNCA** deixe sua branch parada por dias. Atualize-a regularmente com o `dev` para evitar conflitos: `git merge origin/dev`. |

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
