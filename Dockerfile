# first thing we need to do is define from what image we want to build from
# This image comes with Node.js and NPM already installed
FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# a wildcard is used to ensure both package.json and package-lock.json are copied
COPY package*.json ./

RUN npm install
# if you are building your code for production:
# RUN npm ci --only=production

# bundle app source
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define thew command to run your app using CMD which defines your runtime.
CMD [ "node", "server.js"]