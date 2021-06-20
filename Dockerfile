FROM node:14-alpine

WORKDIR /app

ADD src/ .

RUN npm i --production

EXPOSE 3000

CMD [ "npm", "run", "start" ]