# SBF-challenge
[![Package][Express-image]][Express-url]
[![Technology][node-image]][node-url]
[![Technology][typescript-image]][typescript-url]
[![Package][Swagger-image]][Swagger-url]
[![Technology][Docker-image]][Docker-url]
[![Technology][PostgreSQL-image]][PostgreSQL-url]

[Express-url]: https://www.npmjs.com/package/Express
[Express-image]: https://img.shields.io/badge/Express-green?style=for-the-badge&logo=Express&logoColor=black

[node-url]: https://nodejs.org/
[node-image]: https://img.shields.io/badge/NodeJS-green?style=for-the-badge&logo=Node.js&logoColor=black

[typescript-url]: https://www.typescriptlang.org
[typescript-image]: https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=TypeScript&logoColor=white

[Swagger-url]: https://swagger.io/
[Swagger-image]: https://img.shields.io/badge/Swagger-green?style=for-the-badge&logo=Swagger&logoColor=black

[Docker-url]: https://www.docker.com/
[Docker-image]: https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=Docker&logoColor=white

[PostgreSQL-url]: https://www.postgresql.org/
[PostgreSQL-image]: https://img.shields.io/badge/PostegreSQL-blue?style=for-the-badge&logo=Postgresql&logoColor=black


Backend technical challenge from SBF Group.

Author: [Silas Stoffel](https://www.linkedin.com/in/silas-stoffel)

Email: silasstofel@gmail.com

Phone: +55(27)99635-4103

# Requirements
 - [Docker](https://www.docker.com/)
 - [Docker Compose](https://docs.docker.com/compose)
 - [Node 18.15](https://nodejs.org/en/)
 - [PostgreSQL 14+](https://www.postgresql.org/download)

## About

Proposta para resolver o desafio de conversão de moedas é baseado em uma entidade que representa o mapeamento(de/para) com valor dessa base conversão, veja:

```ts
class CurrencyMapConverter {
    id?: string;
    currencyCodeFrom!: CurrencyCode;
    currencyCodeTo!: CurrencyCode;
    value!: number;
    active = false;
    createdAt?: Date;
    updatedAt?: Date
}

// Supported currency
enum CurrencyCode {
    BRL = 'BRL',
    USD = 'USD',
    EUR = 'EUR',
    INR = 'INR'
}

```
Esse abordagem permite evolução para suportar as demais moedas apenas modificando o mapeamento. Essa proposta não contempla funcionalidade de criar mapeamento via API ou backoffice.

**Sugestão de Escalabilidade:**
Sobre escalabilidade, inicialmente a solução foi pensada para resolver 3 moedas (USD, EUR, INR), isso parece ser uma situação bem "simples" em que o banco de dados consiga suportar, por isso, o mapeamento está sendo persistido em banco de dados Postgres com index em `currencyCodeFrom, currencyCodeTo`. Se isso se tornar um gargalo podemos pensar em usar solução de cache em memória (`Redis, Memcache`). A codificação permite a troca sem afetar o domínio da aplicação, basta que seja implementado a [CurrencyMapConverterRepositoryInterface](./src/currency/domain/currency-map-converter.repository.interface.ts) e a troca no container de injeção de dependência. Inicialmente optei por seguir uma solução mais convencional.

**Trade-Offs:**

Considerando o cenário de uma boa experiência para o cliente, não seria interessante ficar mudando a cotação o tempo todo consumindo uma API que trás cotação em tempo real. Imagina um cenário que um cidadão americano veja um produto pela manhã que custa USD 100 e a tarde esse mesmo produto custa USD 101,50. Isso foi um dos motivos de usar base de dados no contexto da aplicação com o mapa de conversão local e não usar serviço específico para ter valor das moedas comparada com o BRL.

## Setup

**Install dependencies:**
```shell
# it's necessary (required)
npm i
```

**Helper para linux/macOs (já faz tudo o que precisa):**

```shell
# linux/macOs
$ sh ./scripts/shell.sh

# or
$ sh ./scripts/dev.sh #show real-time log (nodemon)
```
[http://localhost:3000/health-check](http://localhost:3000/health-check)


**Outros sistemas operacionais ou setup manual**

Faça uma cópia `.env.example` e renomeie para `.env` (Se for usar node local, mude `DB_HOST=sbf-db`para `DB_HOST=localhost`).

```shell
$ docker-compose up -d
$ docker exec -it sbf-api bash
```

**Não quero usar Docker + Docker-Compose, o que posso fazer?**

Caso opte seguir por esse caminho é necessário instalar estas depêndencias:

 - [Node 18.15](https://nodejs.org/en/)
 - [PostgreSQL 14+](https://www.postgresql.org/download)

Para finalizar certifique que .env esteja com credencias de banco de dados corretamente.

```shell
#dev mode
npm run dev

#build
npm run build
```

**Produção**

Este modo cria um ambiente para produção, rodando diretamente arquivo js já transpilado e sem dependencias de desenvolvimento.

```shell
$ docker-compose -f docker-compose.prod.yaml up --build
```
## Onboarding

Quando a aplicação subir por padrão ela irá criar valores para permitir a cotação, o valores são:

From       | To      | Value
:--------- | :------ | :-------
USD        | BRL     | 5.24
EUR        | BRL     | 5.61
INR        | BRL     | 0.06


Agora acesse o [swagger](http://localhost:3000/health-check) para fazer o teste e entender o schema da respostas.

Por se tratar de um desafio e não ser uma solução completa de conversão de moedas, não há uma API ou backoffice que permita a alteração do valores de conversão. Mas você pode acessar o banco de dados e editar os valores. No [docker-compose](./docker-compose.yaml) você pode encontrar as credenciais do banco e nas [migrations](./src/shared/infra/database/migrations/) você pode encontrar informações sobre a tabela.

## Tests

Execute os comandos:

```shell
# if you use docker, you need access bash
$ docker exec -it sbf-api bash

npm run test

# test with coverage report
npm run test:coverage
```
## Techs

Essa aplicação foi projetada seguindo alguns princípios e techs, tais como:

- Clean Architeture
- SOLID
- RESTful
- Object Calisthenics
- Repositories
- Tests
- GitHub Actions (Build, Test) *Sonar Cloud não utilizado por ser repositório privado.
- Migrations

A idéia de seguir alguns princípios de clean Arch e poder desenvolver soluções que não fiquem tão  acompladas a framework, ORM, Client HTTP, banco de dados e etc. Em caso de mudança, exigirá esforço apenas para implementar os contratos (interfaces) no domínio.
