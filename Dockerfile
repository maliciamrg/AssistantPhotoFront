# Build stage
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN rm -rf node_modules package-lock.json

RUN npm install

RUN npm i -g serve

COPY . .

ARG VITE_APP_BACKEND_ADDRESS

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]

