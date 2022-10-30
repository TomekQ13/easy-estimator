FROM node:16-alpine

WORKDIR /api
COPY package-lock.json package.json ./
RUN npm install

CMD ["npm", "run", "prod"]