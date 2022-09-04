
# Sistema de Controle de Estoque

## Precisar ter instalado na maquina, para rodar o projeto
**Node.js**

### Para instalar as dependência:
```npm
  npm i 
```

## Configurando o banco de dados.

### Variáveis de Ambiente:

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **.env**

`DATABASE_URL="postgresql://{usuario}:{senha}@localhost:5432/{nome do banco}?schema=public"`

`SESSION_SECRET`

## Inserir a estrutura que foi criado do banco de dados

Este comando vai criar um Histórico da estrutura da tabelas do banco de dados.
```bash
  npx prisma migrate dev --name init
```

### Para criar o prisma client:

```bash
  npx prisma generate
```

## Criar o Admin

Para criar um admin para logar no sistema, deve ir no arquivo **prisma/seed.ts**, e colocar os dados do admin.

Após de ter feito as devidas configuração rode o comando, para executar o seed:
```bash
  npx prisma db seed
```

## Rodando localmente

```bash
  npm run dev
```

## Stack utilizada

**Front-end:** HTML com EJS, CSS, JavaScript

**Back-end:** Node, Express, Prisma, TypeScript