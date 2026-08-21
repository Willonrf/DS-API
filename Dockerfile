FROM node:24-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN npm install -g npm@12.0.2 --ignore-scripts

COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder --chown=node:node /usr/src/app/dist ./dist

USER node

EXPOSE 3030

CMD ["node", "dist/main.js"]