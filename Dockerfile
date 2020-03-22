FROM node:10

WORKDIR /sportApp-nodejs

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g sequelize-cli

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start