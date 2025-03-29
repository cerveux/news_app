# Build stage
FROM node:20.15.1-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Runtime stage
FROM node:20.15.1-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache tini && \
    addgroup -S app && adduser -S app -G app
USER app
COPY --from=builder --chown=app:app /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=app:app /usr/src/app/dist ./dist
COPY --chown=app:app package*.json ./

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]