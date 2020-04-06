FROM node:13.0-alpine as production-stage

WORKDIR /app
ARG ENV_API_URL
ENV API_URL=${ENV_API_URL}

ENV PORT=80

COPY ["./package.json", "package-lock.json", "/app/"]

RUN npm i -g @quasar/cli
RUN npm i --verbose

## Adding source code
COPY ["src", "/app/src/"]
COPY ["src-ssr", "/app/src-ssr/"]
COPY [".eslintignore", ".eslintrc.js", ".postcssrc.js", ".stylintrc", "babel.config.js", "quasar.conf.js", "/app/"]

RUN quasar build -m ssr

EXPOSE 80

CMD ["node", "dist/ssr/server/index.js"]
