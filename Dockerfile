FROM node:12.5.0
COPY .env /app/
COPY dist /app/dist
COPY server /app/server
RUN ls /app
RUN cd /app/server && yarn
CMD cd /app && node server/index.js
