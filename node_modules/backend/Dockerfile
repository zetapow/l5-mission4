# Use official Node.js LTS Alpine image
# FROM node:20-alpine 
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the remaining fles
COPY . .

# Expose a port and run the application
EXPOSE 5000

CMD ["npm", "start"]