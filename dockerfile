FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

# COPY .env.example ./.env


RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/.env /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
