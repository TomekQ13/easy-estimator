#!/bin/bash

domains=(agilepoker.fun www.agilepoker.fun)
email=kuczak.tomasz@gmail.com # Replace with your email
staging=0 # Set to 1 for testing to avoid hitting rate limits

if [ -d "./nginx/ssl/live/${domains[0]}" ]; then
  echo "Certificates already exist."
  exit 0
fi

# Stop Nginx
docker compose stop nginx

# Request Let's Encrypt certificates
for domain in "${domains[@]}"; do
  docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$email" \
    --agree-tos \
    --no-eff-email \
    ${staging:+--staging} \
    -d "$domain"
done

# Start Nginx
docker compose up -d nginx

# Reload Nginx
docker compose exec nginx nginx -s reload
