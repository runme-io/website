FROM node:12.10.0

# Create app directory
WORKDIR /usr/src/app

# Copy application source
COPY . .

# This command we will use as marker from where we can show logs to the customer
RUN echo "START-LOGGING"
RUN npm install && \
    npm run build

EXPOSE 80
ENTRYPOINT npm run start
