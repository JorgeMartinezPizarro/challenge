## TODO

- ADD 2 TESTS
- FORM BEAUTY AND COLOR

# challenge

Solve the following repository challenge:

- https://github.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1/blob/master/README.en-US.md

Read more about it [Aufgabenergebnis.md](https://github.com/JorgeMartinezPizarro/challenge/blob/main/Aufgabenergebnis.md)

## Getting Started

It **requires** [nodejs](https://nodejs.org/en) v18.17.0 and [npm](https://npm.org) v9.6.7 and (optional) [docker](https://docker.com) latest

Just see the secured live version [Live DEMO](https://dev.ideniox.com)

To run with node and npm:

```bash
npm install
npm run build
npm run start
```

To run with docker:

```bash
docker compose up -d
```

There is already a docker image ready to use with the latest build of the challenge:

[Docker Hub](https://hub.docker.com/repository/docker/jorgemartinezpizarro/dev/tags)

Open [http://localhost:31415](http://localhost:31415) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Build docker

For the owner of the account, otherwise change the `jorgemartinezpizarro/dev:challenge` for your own docker account.

```bash
    docker build -t jorgemartinezpizarro/dev:challenge . && docker push jorgemartinezpizarro/dev:challenge && docker compose down --remove-orphans && docker compose up -d
```
