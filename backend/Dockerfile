FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the port your Express app runs on (e.g., 3000)
EXPOSE 3000

# Command to start the application
CMD [ "node", "server.js" ]