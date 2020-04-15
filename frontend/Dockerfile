############## EXPRESS DEPENDENCIES #################
FROM node:13-alpine AS express-dependencies

COPY ["./package.json", "./package-lock.json", "/tmp/app/"]

RUN cd /tmp/app && npm install --only=prod

##################### VUE BUILD #####################
FROM node:10-alpine AS vue-build

## Install dependencies
COPY ["./package.json", "./package-lock.json", "/tmp/build/"]

RUN cd /tmp/build && npm install

COPY ./src /tmp/build/src
COPY ./public /tmp/build/public

## Add source code
COPY ./.browserslistrc \
  ./package.json \
  ./package-lock.json \
  ./.eslintrc.js \
  ./babel.config.js \
  /tmp/build/

RUN ls /tmp/build

## Build
RUN cd /tmp/build && npm run build

################### SERVE ###################
FROM node:13-alpine

ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./bin /usr/src/app/bin
COPY ./package.json ./package-lock.json /usr/src/app/
COPY --from=vue-build /tmp/build/dist /usr/src/app/dist/
COPY --from=express-dependencies /tmp/app/node_modules /usr/src/node_modules/

EXPOSE 80

ENTRYPOINT [ "npm", "start" ]
