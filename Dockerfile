##Shorter as i needed quick start, and don't need to push this to Prod

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]

