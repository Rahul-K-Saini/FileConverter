FROM node:latest

RUN apt-get update && \
    apt install -y ffmpeg

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5567

CMD [ "node", "index.js" ]