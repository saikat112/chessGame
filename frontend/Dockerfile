# Dockerfile for frontend
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install npm globally
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application for production
RUN npm run build

# Start the Next.js application
CMD ["npm", "start"]
