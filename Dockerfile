# Use the official Node.js image
FROM node:22-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install all dependencies required to build and run the application
RUN npm ci

# Copy the rest of your application code
COPY . .

# Build the complete app (React Frontend bundle + combined server.ts into dist/server.cjs)
RUN npm run build

# Expose port 3000 (required for Cloud Run)
EXPOSE 3000

# Set environment production variables
ENV NODE_ENV=production
ENV PORT=3000

# Run the app
CMD [ "npm", "start" ]
