FROM node:20.12.2-alpine3.18 as base

ENV NODE_ENV=production
ENV APP_KEY=KqBJqCkVId6Tvsa2tO8CsDu2C2HdewKj
ENV PORT=3333
ENV LOG_LEVEL=info
ENV DB_HOST=127.0.0.1
ENV DB_USER=mathias
ENV DB_PASSWORD=password
ENV DB_DATABASE=footfix
ENV SESSION_DRIVER=cookie
ENV DB_PORT=5432
ENV HOST=0.0.0.0

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
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
