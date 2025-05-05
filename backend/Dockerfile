# Use the official Node.js image
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Basic deps for Node.js
RUN apk update && apk add --no-cache dumb-init python3 libc-dev make g++

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

ENV FASTIFY_HOST=0.0.0.0
ENV FASTIFY_PORT=3000
# Expose the port for the app
EXPOSE 3000

ENTRYPOINT ["dumb-init"]

# Run the server
CMD ["node", "server.js"]
