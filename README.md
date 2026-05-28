# GymNotes — Frontend

Interface web desenvolvida com **Next.js** para o GymNotes, uma aplicação de registro e acompanhamento de treinos. Permite criar fichas de treino personalizadas, registrar logs diários de exercícios e visualizar a frequência de treinos através de um calendário interativo.

---

## 🚀 Tecnologias

- **[Next.js](https://nextjs.org/)** — framework React com suporte a SSR e roteamento
- **[TypeScript](https://www.typescriptlang.org/)** — tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** — estilização utilitária
- **[Lucide React](https://lucide.dev/)** — ícones
- **[Sonner](https://sonner.emilkowal.ski/)** — notificações toast

---

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/gymnotes-frontend.git
cd gymnotes-frontend

# Instalar dependências
npm install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## ▶️ Rodando o projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm run start
```

A aplicação sobe em `http://localhost:3001`.

> Certifique-se de que o backend está rodando antes de iniciar o frontend.

---

## 📁 Estrutura de Módulos

```
src/
├── app/                  # Rotas e páginas (App Router)
├── lib/
│   ├── api/              # Chamadas à API por módulo
│   └── http/             # Configuração do axios
├── modules/              # Módulos por página (components + hooks)
│   ├── home/
│   ├── landing/
│   ├── login/
│   └── register/
├── shared/               # Componentes, hooks e utils globais
└── types/                # Tipagens globais
```

---

## 🗓️ Funcionalidades

### Ficha de Treino
- Criação de fichas com múltiplos dias de treino
- Seleção de exercícios por dia com definição de séries e repetições
- Atualização e remoção de fichas existentes

### Log de Treinos
- Calendário interativo com navegação entre meses
- Visualização de dias com treino registrado
- Registro de treino por dia: peso, séries e reps por exercício
- Edição e exclusão de registros

### Performance
- Cache local de logs por mês para evitar requisições repetidas
- Debounce na navegação do calendário para reduzir chamadas à API
- Invalidação automática do cache após salvar ou excluir um registro

---

## 🔐 Autenticação

A autenticação é gerenciada via cookies `httpOnly` setados pelo backend. O frontend não armazena tokens — todas as requisições autenticadas enviam os cookies automaticamente via `credentials: include`.

---

## 📡 Integração com a API

As chamadas à API são centralizadas em `src/lib/api/` e consomem o backend GymNotes. A URL base é configurada via variável de ambiente `NEXT_PUBLIC_API_URL`.

```
Backend repo: https://github.com/seu-usuario/gymnotes-backend
```

---

## 🧱 Padrões do Projeto

- **Custom hooks** para separação de lógica e UI nos componentes
- **Cache em memória** para logs do calendário com invalidação por mutação
- **Debounce** na navegação entre meses para controle de rate limit
- **DTOs tipados** compartilhando a mesma estrutura do backend

---

Made with 💚 by **Arthur Zambão**