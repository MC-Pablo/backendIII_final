
FROM node

WORKDIR /app

COPY package.json .

ENV NPM_CONFIG_PROGRESS=true

RUN npm install --verbose

COPY . .

EXPOSE 8080

CMD ["npm", "start"]