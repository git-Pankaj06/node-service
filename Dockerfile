FROM node:20.11.1

WORKDIR /app

COPY . .

RUN npm install -g typescript

CMD ["npm", "run", "prod"]

