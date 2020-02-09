FROM node:12.5.0
COPY . /app
RUN npm i -g yarn
RUN cd /app && yarn && yarn build && cd server && yarn
CMD cd /app && node server/index.js
