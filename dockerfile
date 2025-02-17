# Use official Node.js image as base
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the app for production
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5173

# Serve the app using Vite's production server
CMD ["npm", "run", "dev"]
