FROM node:10

WORKDIR /sportApp-nodejs

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

EXPOSE 3000

CMD npm start