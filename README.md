# 🗡️ Dark Souls 1 Combat Calculator - API (`ds-api`)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge" alt="Status Em Desenvolvimento" />
  <img src="https://img.shields.io/badge/NestJS-v11-red?style=for-the-badge&logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/Fastify-v11-black?style=for-the-badge&logo=fastify" alt="Fastify" />
  <img src="https://img.shields.io/badge/MongoDB-v7-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TypeScript-v5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
</p>

---

## 📌 Sobre o Projeto & Escopo

O **`ds-api`** é uma API backend desenvolvida para prover dados detalhados e estruturados sobre o universo de **Dark Souls 1** de maneira rápida e otimizada para consumo por uma aplicação frontend.

### 📐 Divisão de Responsabilidades (Backend vs. Frontend)

- **Backend (`ds-api`)**:
  - Atua como provedor central de dados para a aplicação.
  - Armazena e expõe informações de bosses/inimigos, atributos base, estatísticas defensivas (físicas e elementais), multiplicadores de New Game Plus (NG+) e conjuntos de ataques (motion values, tipo de dano, stamina, se é parryável ou bloqueável).
  - Futuramente irá expor dados de equipamentos (armas, armaduras, anéis) e itens consumíveis.
  - Desenvolvido com **NestJS + Fastify + MongoDB** com foco em alta performance e baixa latência de resposta.

- **Frontend (Calculadora Client-Side)**:
  - Consome os dados fornecidos por esta API conforme solicitado pelo usuário.
  - Realiza o cálculo no **client-side** de interações de combate em formato de relatório entre o personagem (Character Build do Dark Souls 1) e o inimigo/boss escolhido.
  - Processa lógicas de cálculo de dano, eficácia de defesas, balanço de stamina e absorções.

---

## 🛠️ Tecnologias e Ferramentas

- **Framework Core:** [NestJS](https://nestjs.com/) (v11)
- **HTTP Adapter:** [Fastify](https://www.fastify.io/) (para respostas de altíssima velocidade)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/)
- **ORM:** [TypeORM](https://typeorm.io/) (com driver para MongoDB)
- **Validação & Transformação:** `class-validator`, `class-transformer` e `joi`
- **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

---

## 📁 Estrutura do Projeto (`src/`)

O desenvolvimento da lógica do sistema está concentrado exclusivamente dentro do diretório `src/`

```text
src/
├── app.module.ts            # Módulo raiz (configuração de variáveis de ambiente e conexão MongoDB)
├── main.ts                  # Ponto de entrada (Inicialização com Fastify, Pipes Globais e CORS)
├── app.controller.ts        # Controller raiz
├── app.service.ts           # Service raiz
└── bosses/                  # Módulo de Bosses / Inimigos
    ├── bosses.controller.ts # Endpoints HTTP do recurso bosses
    ├── bosses.service.ts    # Lógica de negócio, consultas e seed do banco
    ├── bosses.module.ts     # Módulo encapsulador de Bosses
    ├── dto/                 # Data Transfer Objects com validação rigorosa
    │   ├── create-boss.dto.ts
    │   └── update-boss.dto.ts
    └── entities/            # Schemas e entidades do TypeORM / MongoDB
        └── boss.entity.ts
```

---

## 🚀 Guia de Uso

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) _(opcional, recomendado para subir o MongoDB rapidamente)_

---

### ⚙️ Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/SeuUsuario/ds-api.git
   cd ds-api
   ```

2. Crie o arquivo de variáveis de ambiente `.env` baseado no `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Exemplo de configuração do arquivo `.env`:
   ```env
   PORT=3030

   DB_HOST=localhost
   DB_PORT=27017
   DB_NAME=darksouls1_calculator
   DB_USER=root
   DB_PASS=example

   MONGO_URI=mongodb://root:example@localhost:27017/darksouls1_calculator?authSource=admin
   ```

---

### 🐳 Inicializando o Banco de Dados com Docker

Para subir a instância do MongoDB localmente utilizando o Docker Compose:

```bash
docker-compose up -d
```

---

### 📦 Instalação e Execução

1. Instale as dependências do projeto:

   ```bash
   npm install
   ```

2. Inicie o servidor em modo de desenvolvimento (watch mode):

   ```bash
   npm run start:dev
   ```

3. Para executar em ambiente de produção:
   ```bash
   npm run build
   npm run start:prod
   ```

A API estará rodando por padrão em `http://localhost:3030`.

---

## 📡 Endpoints da API

### 👹 Recurso de Bosses (`/bosses`)

| Método | Endpoint        | Descrição                                                                               |
| :----- | :-------------- | :-------------------------------------------------------------------------------------- |
| `POST` | `/bosses/seed`  | Executa o seed inicial populando a base de dados com bosses padrão (ex: _Asylum Demon_) |
| `GET`  | `/bosses`       | Retorna a lista completa de bosses cadastrados                                          |
| `GET`  | `/bosses/:name` | Busca as informações e estatísticas detalhadas de um boss pelo nome                     |
| `POST` | `/bosses`       | Cadastra um novo boss (com validação estrita via DTO)                                   |

#### Exemplo de Payload para Cadastro de Boss (`POST /bosses`):

```json
{
  "name": "Asylum Demon",
  "baseHP": 813,
  "baseDefenses": {
    "standard": 90,
    "strike": 90,
    "slash": 90,
    "thrust": 90,
    "magic": 111,
    "fire": 68,
    "lightning": 111
  },
  "baseAttackRatings": {
    "physical": 120,
    "magic": 0,
    "fire": 0,
    "lightning": 0
  },
  "isParryableOverall": false,
  "ngMultipliers": [
    {
      "cycle": 0,
      "hpMultiplier": 1.0,
      "damageMultiplier": 1.0,
      "defenseMultiplier": 1.0
    },
    {
      "cycle": 1,
      "hpMultiplier": 2.37,
      "damageMultiplier": 2.15,
      "defenseMultiplier": 1.05
    }
  ],
  "attacks": [
    {
      "attackName": "Hammer Smash",
      "motionValue": 1.2,
      "damageType": "strike",
      "isParryable": false,
      "isBlockable": true,
      "staminaDamageBase": 60
    },
    {
      "attackName": "Flying Butt Drop",
      "motionValue": 1.5,
      "damageType": "strike",
      "isParryable": false,
      "isBlockable": false,
      "staminaDamageBase": 100
    }
  ]
}
```

---

## 🧪 Testes e Qualidade

O projeto inclui rotinas automatizadas de testes unitários e de integração (E2E), além de linter e formatador de código.

```bash
# Executar testes unitários (Jest)
npm run test

# Executar testes E2E
npm run test:e2e

# Gerar relatório de cobertura de testes
npm run test:cov

# Executar Linter (ESLint)
npm run lint

# Formatar código (Prettier)
npm run format
```

---

## 🗺️ Roadmap de Desenvolvimento

- [x] Arquitetura base NestJS v11 + Fastify + TypeScript
- [x] Integração com MongoDB via TypeORM e Docker Compose
- [x] Modelagem, DTOs e Endpoints para Bosses / Inimigos
- [x] Módulo de Armas (Weapon Stats, Scaling STR/DEX/INT/FTH, Infusões)
- [x] Módulo de Armaduras (Sets, Defesas Físicas/Elementais, Resistências a Status)
- [x] Módulo de Anéis e Buffs (Modifiers passivos de combate)
- [x] Módulo de Itens e Consumíveis
- [ ] Otimizações adicionais de cache para consultas ultrarrápidas do frontend
