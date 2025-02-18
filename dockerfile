# Use official Node.js image as the builder
FROM node:20.17.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .


# Build the Next.js application
RUN npm run build

# Install production dependencies only
RUN npm ci --omit=dev

# # Use a minimal Node.js runtime for the final image
# FROM node:20.17.0-alpine

# # Set working directory
# WORKDIR /app

# # Copy only the necessary files from the builder stage
# COPY --from=builder /app/package.json /app/package-lock.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.env.production ./.env.production

# Set environment variable for production
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["node", "node_modules/.bin/next", "start"]
