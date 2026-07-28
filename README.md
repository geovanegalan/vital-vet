# 🐾 VitalVet

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=jsonwebtokens)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

Sistema de gerenciamento de consultas e exames veterinários, construído do zero como projeto de estudo e portfólio.

---

## 📋 Sobre o projeto

O VitalVet é um sistema para clínicas veterinárias gerenciarem o cadastro de tutores e pacientes, agendamento de consultas e exames, histórico clínico e controle de estoque de materiais.

É um projeto em constante evolução: comecei simples, com o objetivo de sedimentar conceitos de backend, frontend e boas práticas de desenvolvimento, e venho adicionando complexidade conforme aprendo. A lista completa do que já foi feito e do que ainda falta está na seção [Roadmap](#-roadmap).

O objetivo de longo prazo é evoluir esse projeto até um nível que possa ser utilizado por uma clínica real.

---

## ✨ Funcionalidades

- Autenticação de usuários com JWT
- Cadastro, listagem e busca de tutores (por CPF)
- Cadastro, listagem e vínculo de pacientes (pets) a um tutor
- Preenchimento automático de endereço via integração com a API ViaCEP
- Validação de CPF, e-mail, telefone e CEP no formulário, com máscara de digitação
- Agendamento de consultas com protocolo sequencial único
- Cancelamento de agendamentos com motivo obrigatório
- Marcação de agendamentos como realizados, tornando-os imutáveis
- Proteção de rotas da API via middleware de autenticação

---

## 🏗️ Decisões arquiteturais

Construir esse projeto tem sido também um exercício de arquitetura de software. Algumas decisões que tomei ao longo do caminho:

- **Arquitetura em camadas** (`routes` → `services` → banco de dados): cada camada tem uma única responsabilidade. As rotas só recebem e devolvem requisições HTTP, os services concentram toda a regra de negócio. Isso deixa o projeto pronto para trocar o JSON Server por um banco de dados real sem precisar alterar uma linha das rotas.
- **Agendamento separado de exame**: um agendamento é uma promessa futura ("o Rex vai fazer um hemograma sexta às 14h"), enquanto o exame é o evento que de fato aconteceu, com resultado, observações e duração real. Misturar os dois geraria campos vazios e confusão de responsabilidade.
- **Protocolo sequencial como identificador visível**: o ID interno de cada registro é um UUID gerado automaticamente, ilegível para humanos. Por isso, agendamentos possuem um número de protocolo sequencial (a partir de 1000), pensado para ser o identificador que o tutor e o atendente realmente usam no dia a dia.
- **Cadastro de tutor e pet em etapas separadas**: em vez de um cadastro simultâneo, o tutor é cadastrado primeiro e o pet é vinculado a ele depois, buscando pelo CPF. Isso evita ambiguidade e é o padrão usado por sistemas de saúde reais.
- **Senhas nunca armazenadas em texto puro**: uso da biblioteca bcrypt para gerar hash das senhas antes de qualquer gravação no banco.

---

## 🎓 Aprendizados

- **Construir e consumir minha própria API REST com Express**: sair da teoria da faculdade e aplicar na prática foi o maior salto de entendimento até aqui.
- **Métodos e ciclo de vida de uma requisição HTTP**: entender na prática a diferença entre GET, POST, PUT/PATCH e DELETE, e como cada um se comporta.
- **Interfaces em TypeScript**: definir o formato dos dados antes de qualquer implementação ajudou a pensar melhor na modelagem do sistema inteiro.
- **Princípio da responsabilidade única**: cada arquivo e cada função cuidando de uma única coisa tornou o código muito mais fácil de manter e debugar.
- **Autenticação JWT**: entender como um token mantém o usuário autenticado sem reenviar credenciais a cada requisição, e como ele protege rotas sensíveis.
- **Hash de senhas com bcrypt**: entendi por que nunca se deve salvar senha em texto puro e como o bcrypt compara uma senha digitada com um hash sem nunca descriptografá-lo.
- **Middlewares no Express**: como interceptar requisições antes delas chegarem nas rotas, usado aqui para proteger endpoints que exigem login.
- **Manipulação do DOM**: aplicar na prática algo que já tinha estudado na faculdade, dessa vez em um projeto real de ponta a ponta.
- **Consumo de APIs externas**: integração com a API ViaCEP para preencher endereço automaticamente a partir do CEP digitado.
- Ainda estou no início dessa jornada e sei que tem muito conceito novo pela frente. Esse projeto é justamente o espaço onde pretendo continuar aprendendo e documentando essa evolução.

---

## 🛠️ Tecnologias utilizadas

**Backend**

- Node.js + TypeScript
- Express
- JSON Server (simulando banco de dados, com migração para banco real planejada)
- Autenticação JWT
- Axios
- ESLint + Prettier

**Frontend**

- HTML5
- Tailwind CSS
- JavaScript

---

## 🚀 Guia de instalação e uso

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/SEU_USUARIO/vital-vet.git
cd vital-vet
```

2. Instale as dependências do backend:

```bash
cd backend
npm install
```

3. Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```
JWT_SECRET=sua_chave_secreta_aqui
```

4. Em um terminal, inicie o JSON Server (banco de dados simulado):

```bash
cd database
npx json-server db.json --port 3001
```

5. Em outro terminal, inicie o backend:

```bash
cd backend
npm run dev
```

6. Abra o frontend com a extensão **Live Server** do VS Code (ou qualquer servidor estático), apontando para a pasta `frontend/pages`.

7. Acesse a tela de login e utilize as credenciais de um usuário cadastrado no `db.json` (veja a seção de seed data do banco).

---

## 📁 Estrutura de pastas

```
vital-vet/
├── backend/
│   └── src/
│       ├── config/        → configuração da instância Axios
│       ├── middlewares/    → middleware de autenticação
│       ├── routes/         → definição dos endpoints da API
│       ├── services/       → regras de negócio e comunicação com o banco
│       ├── types/          → interfaces TypeScript
│       └── server.ts       → ponto de entrada da aplicação
│
├── database/
│   └── db.json             → banco de dados simulado (JSON Server)
│
└── frontend/
    ├── pages/               → páginas HTML
    ├── css/                 → estilos globais e por página
    └── js/
        ├── utils/           → funções utilitárias reutilizáveis
        └── services/        → integrações com APIs externas
```

---

## 🗺️ Roadmap

### Próximas implementações

- [ ] Migração do JSON Server para PostgreSQL/SQLite com Prisma
- [ ] Sistema de histórico de agendamentos (auditoria completa)
- [ ] Service de exames e controle de estoque de materiais
- [ ] Controle de disponibilidade de horários para agendamento
- [ ] Sistema de notificações (tutor e veterinário)
- [ ] Emissão de laudos em PDF
- [ ] Tratamento de erros centralizado
- [ ] Documentação da API com Swagger
- [ ] Migração do token de autenticação de localStorage para cookie httpOnly
- [ ] Cache para reduzir requisições redundantes
- [ ] Cadastro de pessoa jurídica (CNPJ)
- [ ] Responsividade completa do frontend
- [ ] Busca de pets e tutores por nome

---

## 📄 Licença

Este projeto é de caráter pessoal e educacional. Sinta-se à vontade para explorar o código como referência de estudo, mas seu uso comercial não é autorizado.

---

## 👤 Autor

**Geovane Galan**

Estudante de Sistemas para Internet (UTFPR - Guarapuava)

[GitHub](https://github.com/geovanegalan) • [LinkedIn](https://www.linkedin.com/in/geovanegalan/)
