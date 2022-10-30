FROM node:16-alpine

WORKDIR /websocket-server
COPY package-lock.json package.json ./
RUN npm install

CMD ["npm", "run", "prod"]