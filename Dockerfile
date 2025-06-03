FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

# Add this line 👇 to generate Prisma client
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/src/app/app.js"]