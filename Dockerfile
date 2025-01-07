FROM node:18-alpine3.20

RUN apk add --no-cache bash git openssh 

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm","run","dev"]