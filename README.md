# Aponti: Sistema de Controle de Garantia

## Descrição do Projeto

O **Aponti** é o projeto integrador do curso de Frontend, desenvolvido para resolver o problema da má gestão de notas fiscais e certificados de garantia. O aplicativo tem como objetivo centralizar, organizar e emitir alertas sobre o prazo de validade das garantias de equipamentos adquiridos pelos usuários.

Este projeto está sendo desenvolvido em um ambiente ágil, com foco em aprendizado e boas práticas de desenvolvimento.

---

## Início Rápido (Quick Start)

Siga estes passos para ter o projeto rodando em sua máquina local.

### 1. Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

*   **Node.js:** Versão 18 ou superior.
*   **VS Code:** Editor de código.
*   **Git:** Para controle de versão.

### 2. Configuração do Ambiente

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/gabrifgaraujo/app-controle-garantia/
    cd aponti-controle-garantia
    ```

2.  **Instale as Dependências:**
    ```bash
    # Não esqueça desse ponto, ele é importantíssimo para instalar as dependências necessárias.
    npm install
    ```

3.  **Execute o Projeto:**
    ```bash
    # Rode a aplicação.
    npm run dev
    ```
    O aplicativo estará acessível em `http://localhost:3000`.

---

## Tecnologias e Padrões

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Frontend** | React | Biblioteca principal para construção da interface. |
| **Linguagem** | TypeScript | Garante tipagem estática, essencial para evitar erros e aumentar a qualidade do código. |
| **Estilização** | CSS / Styled Components | Estilização com foco em Mobile First. |
| **Qualidade** | ESLint | Ferramenta para identificar e reportar padrões problemáticos no código. |
| **Formatação** | Prettier | Formata o código automaticamente, garantindo consistência visual em todo o projeto. |

---

## Fluxo de Contribuição (Git)

**ATENÇÃO:** O envio de código diretamente para a branch `main` é **bloqueado**. Todo o código deve passar por um **Pull Request (PR)** e ser revisado pelo Líder Técnico ou SCRUM Master.

### O Fluxo de Trabalho Diário

1.  **Atualize sua Main:** Antes de começar a trabalhar, garanta que sua branch `main` local esteja atualizada.
    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Crie sua Branch de Feature:** Crie uma nova branch para a sua tarefa. Use o padrão `feat/nome-da-tarefa` ou `fix/nome-do-bug`.
    ```bash
    git checkout -b feat/cadastro-simples
    ```

3.  **Codifique e Teste:** Faça suas alterações e teste localmente.

4.  **Adicione e Comite:** Adicione os arquivos alterados e faça o commit.
    ```bash
    git add .
    git commit -m "feat: Implementa o formulário de cadastro simplificado"
    ```
    *Use o padrão de commit: `feat:` (nova funcionalidade), `fix:` (correção de bug), `refactor:` (refatoração).*

5.  **Envie para o GitHub:**
    ```bash
    git push origin feat/cadastro-simples
    ```

6.  **Abra o Pull Request (PR):** Vá para o GitHub e abra um Pull Request da sua branch para a `main`. Preencha o template de PR detalhando o que foi feito.

---

## Comandos Úteis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o projeto em modo de desenvolvimento. |
| `npm install` | Instala todas as dependências do projeto. |
| `npm run lint` | Executa o ESLint para verificar erros de código. |
| `npm run format` | Executa o Prettier para formatar todos os arquivos. |
| `npm run build` | Cria a versão de produção do aplicativo. |

---

## Configuração do VS Code (Recomendado)

Para garantir que o Prettier e o ESLint funcionem automaticamente, instale as seguintes extensões e verifique se a formatação ao salvar está ativada:

*   **ESLint**
*   **Prettier - Code formatter**

**Configuração Local:** O projeto já inclui um arquivo `.vscode/settings.json` que deve forçar a formatação ao salvar. Se não funcionar, verifique as configurações do seu editor.
```json
// .vscode/settings.json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
