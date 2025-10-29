# Build stage
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN rm -rf node_modules package-lock.json

RUN npm install

RUN npm i -g serve

COPY . .
COPY env.sh /docker-entrypoint.d/env.sh
RUN dos2unix /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD [ "serve", "-s", "dist" ]

