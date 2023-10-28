FROM node:18 AS base

RUN npm install -g @nestjs/cli

# Development
FROM base AS development

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["nest", "start", "--watch"]

# PRODUCTION IMAGE
FROM node:18 AS production

WORKDIR /app
COPY package*.json .
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]
