FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=8080
RUN addgroup -S app && adduser -S app -G app
COPY package.json server.js ./
USER app
EXPOSE 8080
LABEL org.opencontainers.image.title="sample-node"
HEALTHCHECK --interval=10s --timeout=2s CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
CMD ["node", "server.js"]
