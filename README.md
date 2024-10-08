# Challenge

Solve the following [frontend-junior-code-challenge-1](https://github.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1/blob/master/README.en-US.md)

Read more about the results [here](https://github.com/JorgeMartinezPizarro/challenge/blob/main/Task%20Result.md)

## Installing and running

Just see the secured live version [Live DEMO](https://dev.ideniox.com)

To continue you **require** [nodejs](https://nodejs.org/en) `v18.17.0` and [npm](https://npm.org) `v10.8.2` or [docker](https://docker.com) `26.0.1`

To run with node and npm:

```bash
git clone git@github.com:JorgeMartinezPizarro/challenge.git
cd challenge
npm install
npm run build
npm run start
```

There is a [docker image](https://hub.docker.com/repository/docker/jorgemartinezpizarro/dev/tags) to run with docker:

```bash
git clone git@github.com:JorgeMartinezPizarro/challenge.git
cd challenge
docker compose up -d
```

Open [http://localhost:31415](http://localhost:31415) to see the result.

## Build with docker

For the owner of the account, otherwise change the `jorgemartinezpizarro/dev:challenge` for your own docker account.

```bash
    docker build -t jorgemartinezpizarro/dev:challenge . 
    docker compose down --remove-orphans
    docker compose up -d
    docker push jorgemartinezpizarro/dev:challenge
```
