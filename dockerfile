FROM node:20-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build


FROM base as production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD npm start

FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev



# Use official Node.js image as the builder
# FROM node:20.17.0-alpine AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json ./

# # Install dependencies
# RUN npm iinstall

# # Copy the rest of the application files
# COPY . .


# # # Build the Next.js application
# # RUN npm run build

# # # Install production dependencies only
# # #RUN npm i 

# # # Use a minimal Node.js runtime for the final image
# # FROM node:20.17.0-alpine

# # # Set working directory
# # WORKDIR /app

# # # Copy only the necessary files from the builder stage
# # COPY --from=builder /app/package.json /app/package-lock.json /
# # COPY --from=builder /app/node_modules node_modules
# # COPY --from=builder /app/.next .next
# # COPY --from=builder /app/public public
# # COPY --from=builder /app/.env.production /.env.production

# # Set environment variable for production
# ENV NODE_ENV=production

# # Expose port
# EXPOSE 3000

# # Start the Next.js application
# # CMD ["node", "node_modules/.bin/next", "start"]
# CMD ["npm", "run", "start"]
