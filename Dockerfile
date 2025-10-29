# Build stage
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN rm -rf node_modules package-lock.json

RUN npm install

RUN npm i -g serve

COPY . .
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN dos2unix /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD [ "serve", "-s", "dist" ]

