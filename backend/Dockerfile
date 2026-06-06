FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
# Comando para rodar em modo dev (ex: usando nodemon ou ts-node-dev)
CMD ["npm", "run", "dev"]