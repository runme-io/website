FROM node:12.10.0

# Create app directory
WORKDIR /usr/src/app

# Copy application source
COPY . .

RUN npm install && \
    npm run build

EXPOSE 80
ENTRYPOINT npm run start
