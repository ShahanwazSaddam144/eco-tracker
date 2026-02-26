# Use Node.js 20 base image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock (or pnpm-lock)
COPY package*.json ./

# Install dependencies
RUN npm install
# If you use pnpm: RUN npm install -g pnpm && pnpm install

# Copy the rest of the backend code
COPY . .

# Set environment variables (optional defaults, can be overridden with .env)
ENV PORT=3000

# Expose the port the app listens on
EXPOSE 3000

# Command to run your server
CMD ["node", "server.js"]