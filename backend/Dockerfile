# Specify a base image
FROM node

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install 
COPY . .

EXPOSE 3001

# Default command
CMD ["npm", "start"]
