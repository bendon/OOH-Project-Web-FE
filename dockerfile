# Use official Node.js image as base
FROM node:20.17.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm cache clean --force

RUN npm install -g npm@latest

RUN npm install -g vite
# Install dependencies
RUN npm install


RUN npm install vite --save-dev

# Copy the rest of the app files
COPY . .

# Build the app for production
RUN npm run build




# Expose the port that the app will run on
EXPOSE 5173

# Serve the app using Vite's production server
CMD ["npm", "run", "preview"]
