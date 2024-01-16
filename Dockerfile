FROM node:21 

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./app

EXPOSE 3001

CMD ["npm", "start"]


