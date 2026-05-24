# VitalPet

## Integrantes

- João Victor Alcântara — RM562707
- Phillipo Barbosa — RM565399
- Vitor Madrigrano — RM564191
- Eduardo Martins — RM562259

---

# Descrição do Projeto

O VitalPet é um aplicativo mobile desenvolvido em React Native com Expo, criado com o objetivo de facilitar o gerenciamento de cuidados veterinários para tutores e clínicas veterinárias.

O aplicativo possui dois fluxos principais:

- Fluxo Tutor
- Fluxo Clínica Veterinária

A aplicação simula funcionalidades reais de um sistema veterinário moderno, incluindo:

- gerenciamento de pacientes;
- consultas;
- vacinas;
- exames;
- emergências;
- financeiro;
- relatórios;
- planos e assinaturas.

O projeto foi desenvolvido como protótipo funcional para o Challenge de Mobile Application Development da FIAP.

---

# Funcionalidades

## Tutor

- Escolha de perfil
- Cadastro de tutor
- Home do tutor
- Cadastro de pets
- Perfil do pet
- Histórico veterinário
- Vacinas
- Consultas
- Lembretes
- Medicações
- Planos
- Chat
- Score do pet

---

## Clínica

- Login da clínica
- Cadastro da clínica
- Dashboard da clínica
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
- Controle administrativo

---

# Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- React Native SVG

---

# Estrutura de Pastas

```bash
app/
├── _layout.tsx
├── index.tsx
├── onboarding.tsx
├── choose-profile.tsx

├── tutor-login.tsx
├── tutor-create.tsx
├── tutor-home.tsx
├── pet-form.tsx
├── pet-success.tsx
├── pet-profile.tsx
├── pet-detail.tsx
├── pet-health.tsx
├── pet-preferences.tsx
├── pet-score-detail.tsx
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

assets/
├── icons/
├── images/
├── logos/
└── favicon.png

src/
├── components/
│   └── atoms/
│       ├── Button/
│       ├── CardOption/
│       ├── Input/
│       ├── Logo/
│       └── Text/
├── constants/
└── @types/
```

---

# Organização das Telas

O projeto está organizado em dois fluxos principais:

## Fluxo Tutor

Telas voltadas para o usuário tutor, permitindo cadastro, gerenciamento de pets, lembretes, vacinas, consultas, saúde do pet e dados pessoais.

---

## Fluxo Clínica

Telas voltadas para clínicas veterinárias, permitindo gerenciamento de pacientes, agenda, atendimentos, exames, vacinas, emergências, financeiro, relatórios e planos de assinatura.

---

# Navegação

O projeto utiliza Expo Router para gerenciamento de rotas e navegação entre telas.

Fluxos implementados:

- Navegação Tutor
- Navegação Clínica
- Navegação por Bottom Tab
- Navegação entre formulários e detalhes

---

# Manipulação de Estado

O aplicativo utiliza:

- useState
- formulários controlados
- validações visuais
- renderização dinâmica de dados

---

# Persistência Local

O projeto utiliza AsyncStorage para persistência de dados locais, permitindo:

- salvar informações do usuário;
- restaurar dados após reiniciar o aplicativo;
- manter preferências e formulários preenchidos.

---

# Como Executar o Projeto

## Instalar dependências

```bash
yarn
```

ou

```bash
npm install
```

---

## Rodar o projeto

```bash
npx expo start
```

---

## Executar no celular

1. Instale o aplicativo Expo Go
2. Escaneie o QR Code gerado no terminal

---

# Repositório

```txt
https://github.com/alc-joao/VitalPet-Challenge.git
```

---

# Link Vídeo Pitch

```txt
https://www.youtube.com/watch?v=KMTkmrL5NeE
```

---

# Observações

Este projeto possui fins acadêmicos e foi desenvolvido para demonstração prática de conceitos de desenvolvimento mobile utilizando React Native com Expo.