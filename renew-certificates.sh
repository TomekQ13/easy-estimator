#!/bin/bash

# Stop Nginx to free up port 80
docker-compose stop nginx

# Renew certificates
docker-compose run --rm certbot renew

# Start Nginx
docker-compose up -d nginx

# Reload Nginx to apply new certificates
docker-compose exec nginx nginx -s reload
