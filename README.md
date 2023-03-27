# Connecto

## Contents

- [Description](#description)
- [Features](#features)
- [Design](#design)
- [Technologies](#technologies)
- [Local setup](#local-setup)

## Description

Connecto is an omnichannel customer support messaging solution focused on providing a fast, flexible, and effective customer and employee experience.

Created by: [John Royal](https://github.com/john-royal), [Jake Enea](https://github.com/jakeenea51), and [Nathaniel Mention](https://github.com/NathanielMention)


## Features
- __Janet__ - customer support chatbot powered by GPT-3.5 Turbo
- Individualized real-time chat rooms, accessible by all administrators
- Support for sending image attachments and sharing location
- Flexibility to message via SMS and email
- Profile pictures powered by Gravatar
- Secure sign-up and sign-in functionality


## Design

### Sign-in
![image](https://user-images.githubusercontent.com/91490989/228003337-1ab7d538-721e-4d66-b2db-46b8c7b13ec9.png)

### Admin dashboard
![image](https://user-images.githubusercontent.com/91490989/228003807-5c1cb547-08cc-4321-b2ee-91a039be1ac7.png)

### Customer support chat
![image](https://user-images.githubusercontent.com/91490989/228004803-d4af874f-2a2e-467c-9df1-bc87b6775f29.png)


## Technologies

- [GPT-3.5 Turbo](https://platform.openai.com/docs/guides/chat)
- [Express](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Amazon Web Services](https://docs.aws.amazon.com/iam/index.html?nc2=h_ql_doc_iam)

## Local setup

### Clone repository:

```
git clone https://github.com/jakeenea51/Connecto
```

### Install backend dependencies:

```
cd backend
pnpm install
```

### Copy `.env.example` to create your `.env` file:

```
cp .env.example .env
```

You’ll want to generate random, 32-character strings for both the `SESSION_SECRET` and `JWT_SECRET` variables. You can use [this tool](https://1password.com/password-generator/) to generate those values.

### Set up database:

```
pnpm exec prisma db push
```

### Start the backend development server:

```
pnpm dev
```

### Install frontend dependencies:

```
cd frontend
pnpm install
```

### Start the frontend development server:

```
pnpm dev
```
