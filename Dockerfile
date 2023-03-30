FROM node:16

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .

RUN npm install

# copy app files
COPY . .

# expose port and start application
EXPOSE 3001
CMD ["npm", "start"]