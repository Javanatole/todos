FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.26.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html