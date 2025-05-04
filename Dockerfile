# Use official Node.js image as a base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to the working directory
COPY package*.json ./

# Remove node_modules and package-lock.json (if it exists) to avoid conflicts
RUN rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that Vite will run on
EXPOSE 4173

# Command to run the app in development mode
CMD ["npm", "run", "dev"]