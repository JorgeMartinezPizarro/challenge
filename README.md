## TODO

- editar y borrar
- validar formulario, escape de ; y prohibido "
- agregar tests
- speed up forms
- paginacion en load
- add Dockerfile

# challenge

Solve the following repository challenge:

- https://github.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1/blob/master/README.en-US.md

Read more about it [Aufgabenergebnis.md](https://github.com/JorgeMartinezPizarro/challenge/blob/main/Aufgabenergebnis.md)

## Getting Started

Currently it **requires** `node` version `18.17.0` and `npm` version `10.8.2`

Just see the live version https://ideniox.com:31415

To run the productive version with node and npm installed

```bash
npm install
npm run build
npm run start
```

or start it dockerized via:

```bash
docker compose up
```

Open [http://localhost:31415](http://localhost:31415) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Build docker

```bash
    docker build -t jorgemartinezpizarro/dev:challenge .
    docker push jorgemartinezpizarro/dev:challenge
```