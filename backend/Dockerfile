# Use official Node.js LTS Alpine image
# FROM node:20-alpine 
FROM node:22-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the remaining fles
COPY . .

# typescript to javascript
RUN npx tsc

# Expose a port and run the application
EXPOSE 4000

CMD ["node", "dist/index.js"]