FROM node:18.15

WORKDIR /usr/app

COPY package.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/shared/infra/http/server.js"]
