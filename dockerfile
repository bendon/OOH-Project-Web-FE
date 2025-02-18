FROM node:20-alpine 

WORKDIR /app

COPY package.json ./

RUN npm install -g npm@11.1.0

RUN npm install

COPY . .


RUN npm run build


# FROM base as production
# WORKDIR /app

ENV NODE_ENV=production


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


# COPY --from=base --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=base /app/node_modules ./node_modules
# COPY --from=base /app/package.json ./package.json
# COPY --from=base /app/public ./public

EXPOSE 3000
CMD ["npm", "run", "dev"]



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
