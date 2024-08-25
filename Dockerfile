FROM node:18.17

WORKDIR /app
COPY ./package*.json ./
RUN npm install -g npm@10.8.2
RUN npm install
COPY . .

RUN npm run build
EXPOSE 31415

CMD npm run start