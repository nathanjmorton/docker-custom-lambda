# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files into the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Expose the port that the Lambda function will listen on
EXPOSE 8080

# Start the Lambda function using an emulator like 'lambda-local' or 'aws-lambda-ric'
CMD ["npm", "start"]
