FROM node:14-alpine

WORKDIR /app

ADD . .

RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start" ]