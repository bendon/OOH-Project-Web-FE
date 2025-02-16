# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy project files
COPY . .

# Build Next.js application
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built files
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json

# Set environment variables
ENV NODE_ENV=production
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
