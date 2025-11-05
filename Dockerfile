# Multi-stage Dockerfile for Next.js frontend
# Build stage: install dependencies and build the app
FROM node:18-alpine AS builder
WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# Runner stage: lightweight production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what we need to run
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Install only production dependencies
RUN npm ci --only=production --silent || npm ci --silent

# Expose typical Next.js port
EXPOSE 3000

# Set a sensible default port env var
ENV PORT=3000

# Start the Next.js production server
CMD ["npm","start"]
