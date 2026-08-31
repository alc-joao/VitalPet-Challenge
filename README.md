# VitalPet

Aplicativo mobile para gerenciamento de cuidados veterinários, desenvolvido para o Challenge de Mobile Application Development da FIAP.

## Integrantes

- João Victor Alcântara — RM562707
- Phillipo Barbosa — RM565399
- Leonardo Aragaki — RM562944
- Eduardo Martins — RM562259

---

# Sobre o Projeto

O VitalPet é uma aplicação mobile desenvolvida em React Native com Expo para auxiliar tutores e clínicas veterinárias na organização e acompanhamento dos cuidados com animais de estimação.

O projeto busca centralizar informações importantes relacionadas aos pets e facilitar o acesso do tutor aos dados do animal por meio de uma experiência mobile simples e organizada.

A aplicação possui dois fluxos principais:

- Tutor
- Clínica Veterinária

Na Sprint 3, o foco do desenvolvimento foi a consolidação técnica do fluxo do tutor, com autenticação real, integração com API HTTP e operações de gerenciamento de tutores e pets.

---

# Funcionalidades

## Fluxo Tutor

O fluxo do tutor possui funcionalidades como:

- Cadastro de tutor
- Login com autenticação
- Persistência da sessão
- Logout
- Proteção de telas autenticadas
- Home do tutor
- Visualização dos dados do tutor
- Edição dos dados do tutor
- Exclusão da conta do tutor
- Cadastro de pets
- Listagem dos pets vinculados ao tutor
- Visualização dos dados de um pet
- Edição dos dados do pet
- Exclusão de pets
- Histórico veterinário
- Vacinas
- Consultas
- Lembretes
- Medicações
- Planos
- Chat
- Score do pet

## Fluxo Clínica

O projeto também possui interfaces destinadas ao fluxo de clínicas veterinárias, incluindo:

- Login da clínica
- Cadastro da clínica
- Dashboard
- Agenda veterinária
- Pacientes
- Detalhes do paciente
- Histórico clínico
- Prescrições
- Exames
- Vacinas
- Emergências
- Financeiro
- Relatórios
- Planos e assinaturas

---

# Integração com Backend

Na Sprint 3, o aplicativo passou a realizar comunicação real com uma API backend via HTTP.

A comunicação com o backend é realizada utilizando Axios, enquanto o gerenciamento das requisições, cache e atualização dos dados na interface é realizado com TanStack Query.

Foram implementadas operações de Create, Read, Update e Delete para as principais entidades utilizadas no fluxo do tutor.

## Tutor

- Create — cadastro de tutor
- Read — consulta dos dados do tutor
- Update — atualização do perfil
- Delete — exclusão da conta

## Pet

- Create — cadastro de pet
- Read — listagem e consulta dos pets
- Update — edição das informações do pet
- Delete — exclusão do pet

Após operações de alteração, os dados utilizados pela aplicação são atualizados por meio do gerenciamento de cache do TanStack Query.

Durante as requisições, a interface apresenta estados de carregamento e tratamento de erros.

---

# Autenticação

O VitalPet utiliza Firebase Authentication para autenticação real dos tutores.

O fluxo implementado possui:

- Cadastro com e-mail e senha
- Login com e-mail e senha
- Persistência da sessão autenticada
- Monitoramento do estado de autenticação
- Proteção de rotas internas
- Logout

O estado global de autenticação é controlado através de um `AuthContext`.

As telas internas do tutor são protegidas e usuários não autenticados são redirecionados para a tela de login.

Ao realizar logout, a sessão do Firebase é encerrada e o acesso às rotas protegidas é bloqueado.

---

# Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- TanStack Query
- Axios
- Firebase Authentication
- AsyncStorage
- React Native SVG

---

# Arquitetura e Organização

O projeto utiliza separação de responsabilidades para evitar que regras de negócio e comunicação HTTP fiquem diretamente acopladas às telas.

A estrutura principal está dividida em:

- `app/` — telas e rotas da aplicação
- `src/components/` — componentes reutilizáveis
- `src/contexts/` — contextos globais
- `src/hooks/` — hooks responsáveis pelo gerenciamento das operações com dados
- `src/services/` — comunicação com API e serviços externos
- `src/types/` — tipagens TypeScript
- `src/constants/` — constantes utilizadas pela aplicação
- `assets/` — imagens, logos e ícones

---

# Estrutura de Pastas

```text
app/
├── _layout.tsx
├── index.tsx
├── onboarding.tsx
├── choose-profile.tsx
│
├── tutor-login.tsx
├── tutor-create.tsx
├── tutor-home.tsx
├── tutor-profile.tsx
├── tutor-edit.tsx
├── tutor-delete.tsx
│
├── pet-form.tsx
├── pet-success.tsx
├── pet-profile.tsx
├── pet-detail.tsx
├── pet-health.tsx
├── pet-preferences.tsx
├── pet-score-detail.tsx
│
├── chat-home.tsx
├── consults-home.tsx
├── emergency-home.tsx
├── history-home.tsx
├── medications-home.tsx
├── more-home.tsx
├── my-data.tsx
├── plans-home.tsx
├── reminders-home.tsx
├── score-home.tsx
├── vaccines-home.tsx
│
├── clinic-login.tsx
├── clinic-create.tsx
├── clinic-home.tsx
├── clinic-profile.tsx
├── clinic-patients.tsx
├── clinic-patient-detail.tsx
├── clinic-patient-history.tsx
├── clinic-schedule.tsx
├── clinic-new-appointment.tsx
├── clinic-vaccines.tsx
├── clinic-exams.tsx
├── clinic-prescription.tsx
├── clinic-reminders.tsx
├── clinic-emergency.tsx
├── clinic-finance.tsx
├── clinic-finance-entries.tsx
├── clinic-reports.tsx
└── clinic-plans.tsx

src/
├── @types/
├── components/
├── constants/
│   ├── colors.ts
│   └── routes.ts
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── usePets.ts
│   └── useTutors.ts
├── screens/
├── services/
│   ├── api.ts
│   ├── authService.ts
│   ├── firebase.ts
│   ├── petService.ts
│   └── tutorService.ts
└── types/
    ├── Pet.ts
    └── Tutor.ts

assets/
├── icons/
├── images/
└── logos/
```

---

# Navegação

A navegação do aplicativo é realizada com Expo Router.

As telas são representadas por rotas reais dentro do diretório `app/`, permitindo navegação entre os diferentes fluxos da aplicação.

O projeto possui mais de seis telas distintas e contempla fluxos como:

- Autenticação
- Home do tutor
- Perfil do tutor
- Cadastro e gerenciamento de pets
- Detalhes do pet
- Funcionalidades relacionadas à saúde do animal
- Fluxo da clínica veterinária

As rotas internas do tutor possuem controle de acesso integrado ao Firebase Authentication.

---

# Gerenciamento de Dados

O TanStack Query é utilizado para gerenciar os dados provenientes da API.

Os hooks da aplicação concentram as queries e mutations utilizadas pelas telas.

Entre as operações implementadas estão:

- Consulta de tutores
- Cadastro de tutor
- Atualização de tutor
- Exclusão de tutor
- Consulta de pets
- Cadastro de pet
- Atualização de pet
- Exclusão de pet

Essa organização permite separar a camada de interface da camada responsável pelo acesso aos dados.

---

# Estados de Carregamento e Erro

As telas que dependem de operações assíncronas apresentam feedback durante as requisições.

O aplicativo possui tratamento para:

- carregamento de dados;
- envio de formulários;
- atualização de registros;
- exclusão de registros;
- falhas de comunicação com a API.

Após mutations, o cache das queries relacionadas é atualizado ou invalidado para que as alterações sejam refletidas na interface.

---

# Como Executar o Projeto

## Pré-requisitos

É necessário possuir:

- Node.js
- npm ou Yarn
- Expo
- Expo Go ou ambiente de emulação configurado

Também é necessário que a API backend utilizada pelo projeto esteja disponível para que as funcionalidades integradas possam realizar as requisições HTTP.

## 1. Clonar o repositório

```bash
git clone https://github.com/alc-joao/VitalPet-Challenge.git
```

## 2. Entrar na pasta

```bash
cd VitalPet-Challenge
```

## 3. Instalar as dependências

Com npm:

```bash
npm install
```

ou com Yarn:

```bash
yarn
```

## 4. Iniciar o aplicativo

```bash
npx expo start
```

## 5. Executar

Após iniciar o Expo:

- escaneie o QR Code utilizando o Expo Go; ou
- execute o aplicativo em um emulador Android/iOS configurado.

---

# Backend

A Sprint 3 utiliza integração com API backend desenvolvida para o projeto.

Repositório da API:

```text
https://github.com/Tidlle/Sprint3-Java.git
```

A API deve estar em execução e acessível pelo dispositivo/emulador utilizado para testar o aplicativo.

---

# Repositório Mobile

```text
https://github.com/alc-joao/VitalPet-Challenge.git
```

---

# Vídeo de Apresentação — Sprint 3

O vídeo demonstra o funcionamento da aplicação, incluindo:

- navegação entre telas;
- autenticação;
- integração com a API backend;
- gerenciamento de tutor;
- gerenciamento de pets;
- comportamento da aplicação em execução.

Link:

```text
ADICIONAR_LINK_DO_VIDEO_DA_SPRINT_3
```

---

# Sprint 3

Nesta etapa do projeto foram consolidados os principais requisitos técnicos da aplicação mobile:

- navegação funcional com Expo Router;
- integração real com API HTTP;
- gerenciamento das requisições com TanStack Query;
- CRUD de tutores;
- CRUD de pets;
- autenticação com Firebase Authentication;
- persistência da sessão;
- proteção de rotas;
- organização do projeto em hooks, services, contexts e types;
- estados de carregamento e tratamento de erros.

O projeto continuará sendo refinado e expandido nas próximas etapas do Challenge.