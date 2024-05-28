FROM node:20.12.2-alpine3.18 as base

# All deps stage
FROM base as deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

# Build stage
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /
ADD /predeploy /
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app

# Ajout des commandes pour utiliser le fichier nginx.conf.sigil
ENV PORT=80
ENV DOMAIN=back-footfix.cluster-ig3.igpolytech.fr
ENV APP_HOST=localhost
ENV APP_PORT=3333
ADD nginx.conf.sigil /etc/nginx/conf.d/default.conf.template
RUN apk add --no-cache nginx openssl
RUN mkdir /var/run/nginx
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80 443

CMD /bin/sh -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'" & node ./bin/server.js
