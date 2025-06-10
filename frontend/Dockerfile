# use node.js to build app
FROM node:22-slim as build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . . 
RUN npm run build

# Use nginx to serve the built app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

