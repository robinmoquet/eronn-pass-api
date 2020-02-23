FROM node:13
COPY . /code
RUN npm install

WORKDIR /code

VOLUME .:/code

CMD ["npm", "run", "dev"]
