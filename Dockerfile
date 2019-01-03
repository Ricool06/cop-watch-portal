FROM node:lts-alpine as builder
COPY package.json package-lock.json ./
RUN npm ci && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN npm run build:prod

FROM nginx:stable-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
EXPOSE 8080
LABEL traefik.enable="true" \
      traefik.frontend.rule="Host:localhost,cop-watch-production-environment.egbk2sq3vn.eu-west-1.elasticbeanstalk.com" \
      traefik.port=8080
