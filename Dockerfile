# Dockerfile

FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY prisma ./prisma/

RUN npm ci

RUN npx prisma generate

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
