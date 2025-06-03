FROM node:20.11.1-alpine

WORKDIR /app

# Copy only necessary files first for caching
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start your app directly with Node
CMD ["node", "dist/src/app/app.js"]
