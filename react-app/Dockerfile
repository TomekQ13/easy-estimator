# => Build container
FROM node:alpine as builder
WORKDIR /react-app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# => Run container
FROM nginx:stable-alpine

# Nginx config
COPY nginx.conf /etc/nginx/conf.d
COPY gzip.conf /etc/nginx/conf.d/gzip.conf

# Static build
WORKDIR /usr/share/nginx/html
COPY --from=builder /react-app/build .

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]