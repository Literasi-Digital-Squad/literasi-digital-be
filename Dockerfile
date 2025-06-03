# Base image
FROM node:20.11.1-alpine AS base

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY . .

# Install deps
RUN npm install -g pm2 && npm install

# Build TypeScript
RUN npm run build

# Start with PM2
CMD ["pm2-runtime", "dist/src/app/app.js"]