
# Dockerfile - backend
# Defines the script (Dockerfile) containing instructions on how to 
# build the Docker image for the backend application. These instructions
# specify the environment, base image, dependencies, and configurations
# needed for the app to run inside the container.

# Uses Node.js 18 as base image for container environment
FROM node:18

# Sets working directory inside the container to /app
# The location where all subsequent commands will be executed
WORKDIR /app 

# Copy server files into workdir
COPY server.js .

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install app dependencies defined in package.json
RUN npm install

# Expose port to allow communication between the container and the host
# The port the backend server will listen on
EXPOSE 3000

# Starts the server using 'node server.js' when the container starts
CMD ["node", "server.js"]
