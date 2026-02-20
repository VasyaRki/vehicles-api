FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm ci
RUN npm install -g @nestjs/cli

COPY . .

RUN chmod +x docker-entrypoint.sh

EXPOSE ${APP_PORT}

CMD ["sh", "docker-entrypoint.sh"]
