FROM node:18.13

WORKDIR /myapp
COPY package.json .
RUN npm install

COPY . .

CMD npm start
