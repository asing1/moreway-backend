FROM node:14.15.4

WORKDIR /app

COPY ./app/package.json .

RUN npm install
COPY ./app/moreway /app/moreway/

CMD [ "npm", "start" ]