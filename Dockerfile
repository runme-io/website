FROM node:12.10.0

RUN apt-get update
RUN apt-get install -y gettext-base

ARG RUNME_API_HOST
ARG RUNME_API_SECURE
ARG APPLICATION_PROJECT_ID
ARG API_KEY
ARG API_SECRET

# Create app directory
WORKDIR /usr/src/app

# Copy application source
COPY . .

RUN npm install && \
    npm run build

EXPOSE 80

COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
