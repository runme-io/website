FROM node:12.10.0

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y gettext-base && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install && \
    npm run build

EXPOSE 80

COPY run.sh /

CMD ["/bin/bash", "/run.sh" ]


